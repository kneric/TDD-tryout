require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('../app');
const mongoose = require('mongoose');
chai.should();
chai.use(chaiHttp);
dbURI = process.env.DB_test

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