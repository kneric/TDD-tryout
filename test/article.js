require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('../app');
const mongoose = require('mongoose');
chai.should();
chai.use(chaiHttp);
dbURI = process.env.DB_test
// articleId =
dummyArticle = {
  title: 'my article',
  content: 'hellooooooo woooorlllld!!!!',
  thumbnail: 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg',
}

describe('CRUD article', function() {
  
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
  
  describe('post /article', function () {
  
  
    it('should add new article', function (done){
      chai.request('http://localhost:3000')
      .post('/article')
      .send(dummyArticle)
      .end(function (err, response) {
        console.log(response.body);
        response.status.should.equal(201);
        response.body.should.be.an('object');
        response.body.should.have.property('_id');
        response.body.should.have.property('title');
        response.body.should.have.property('content');
        done();
      })
    })
  
    it('should return error', function (done){
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
  
  describe('get /article', function () {
  
    it('should list all articles', function (done){
      chai.request('http://localhost:3000')
      .get('/article')
      .end(function (err, response) {
        response.status.should.equal(200);
        response.body.should.be.an('array');
        done();
      })
    })
  })

  describe('get /article/:id', function () {
  
    it('should list article with the requested id', function (done){
      chai.request('http://localhost:3000')
      .get('/article/' + articleId)
      .end(function (err, response) {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.should.have.property('_id');
        response.body.should.have.property('title');
        response.body.should.have.property('content');
        done();
      })
    })
  })
  
  describe('put /article/:id', function () {
  
    it('should update articles', function (done){
      chai.request('http://localhost:3000')
      .put('/article/' + articleId)
      .send(dummyArticle)
      .end(function (err, response) {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.should.have.property('_id');
        response.body.should.have.property('title');
        response.body.should.have.property('content');
        done();
      })
    })
  })
  
  describe('delete /article/:id', function () {
  
    it('should delete articles', function (done){
      chai.request('http://localhost:3000')
      .delete('/article/' + articleId)
      .end(function (err, response) {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.should.have.property('_id');
        response.body.should.have.property('title');
        response.body.should.have.property('content');
        done();
      })
    })
  })

})
