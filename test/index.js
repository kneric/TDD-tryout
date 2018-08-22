require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('../app');
const mongoose = require('mongoose');
chai.should();
chai.use(chaiHttp);
dbURI = process.env.DB_test
dummyUser = {
              name: 'hello',
              email: 'h@h.com',
              password: 'hi1234',
            }

        
describe('auth process on index', function () {
  
  after(function (done){
    mongoose.connect(`${dbURI}`, {useNewUrlParser: true})
    .then(()=> {
      return mongoose.connection.db.dropCollection('users')
      .then(()=> {
        console.log('users deleted');
        done()
      })
    })
    .catch(err => {
      console.log(err);
    })
  })

  describe('post /signup', function () {
  
    it('should register new user', function (done){
      chai.request('http://localhost:3000')
      .post('/signup')
      .send(dummyUser)
      .end(function (err, response) {
        response.status.should.equal(201);
        response.body.should.be.an('object');
        response.body.should.have.property('token');
        done();
      })
    })
  
    it('should return error 400 if email is already used', function (done){
      chai.request('http://localhost:3000')
      .post('/signup')
      .send(dummyUser)
      .end(function (err, response) {
        response.status.should.equal(400);
        response.body.should.be.an('object');
        done();
      })
    })
  })

  describe('post /signin', function () {
    it('should return token', function (done) {
      chai.request('http://localhost:3000')
      .post('/signin')
      .send({
        email : dummyUser.email,
        password : dummyUser.password
      })
      .end(function (err, response) {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.should.have.property('token');
        done()
      })
    })

    it('should return error 403 if user/pwd incorrect', function (done) {
      chai.request('http://localhost:3000')
      .post('/signin')
      .send({
        email : 'jdhsadhj',
        password : dummyUser.password
      })
      .end(function (err, response) {
        response.status.should.equal(403);
        response.body.should.be.an('object');
        done()
      })
    })
  })

})
