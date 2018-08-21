const express = require('express');
const router = express.Router();
const {createArticle} = require('../controllers/articleC');

router
  .post('/', createArticle)

module.exports = router

describe('get /articles', function () {
  it('should return article list', function (requestFinished) {
    chai.request(server)
      .get('/articles')
      .end(function (err, response) {
        response.status.should.equal(200);
        response.body.should.be.an('array');
        requestFinished();
      });
  });
});