require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('../app');
const mongoose = require('mongoose');
chai.should();
chai.use(chaiHttp);
dbURI = process.env.DB_test

describe('post /article', function () {

  after(function (done){
    mongoose.connect(`${dbURI}`, {useNewUrlParser: true})
    .then(()=> {
      return mongoose.connection.db.dropCollection('articles')
      .then(()=> {
        done()
      })
    })
    .catch(err => {
      console.log(err);
    })
  })

  it('should return error', function (done){
    chai.request('http://localhost:3000')
    .post('/article')
    .send(
      {
        title: 'my article',
        content: 'hellooooooo woooorlllld!!!!',
        thumbnail: 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg',
      }
    )
    .end(function (err, response) {
      response.status.should.equal(201);
      response.body.should.be.an('object');
      response.body.should.have.property('_id');
      response.body.should.have.property('title');
      response.body.should.have.property('content');
      done();
    })
  })

  it('should add new article', function (done){
    chai.request('http://localhost:3000')
    .post('/article')
    .send()
    .end(function (err, response) {
      response.status.should.equal(400);
      response.body.should.be.an('object');
      done();
    })
  })
})