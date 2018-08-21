const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
chai.should();
chai.use(chaiHttp);

describe('create article', function () {
  it('should add new article', function (done){
    chai.request(app)
    .post('/')
    .end(function (err, response) {
      response.status.should.equal(200);
      response.body.should.be.an('object');
      done();
    })
  })
})


