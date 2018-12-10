var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function() {
  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      });
  });

  it('should create a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'Mufa',
        age: 100,
        pride: 'Evile lions',
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      });
  });

  it('should delete a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'test lion',
        age: 100,
        pride: 'test lions',
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        var lion = resp.body;
        request(app)
          .delete('/lions/' + lion.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(lion);
            done();
          });
      });
  });

  it('should update a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'test lion',
        age: 100,
        pride: 'test lions',
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var lion = resp.body;
        request(app)
          .put('/lions/' + lion.id)
          .send({
            name: 'new name'
          })
          .end(function(err, resp) {
            expect(resp.body.name).to.equal('new name');
            done();
          });
      });
  });

  it('should get a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'test lion',
        age: 100,
        id: 10,
        pride: 'test lions',
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var lion = resp.body;
        request(app)
          .get('/lions/' + lion.id)
          .end(function(err, resp) {
            expect(resp.body).to.be.an('object');
            done();
          });
      });
  });
});
