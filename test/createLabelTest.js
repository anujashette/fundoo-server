let mongoose = require("mongoose");
let Users = require('../app/model/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let fs = require('fs')
path = require('path'),

  chai.use(chaiHttp);
filePath = path.join(`${__dirname}/data.json`);
var data = fs.readFileSync(filePath)
data = JSON.parse(data)

describe('Label api testing', () => {

  it('Add label testing', (done) => {
    chai.request(server)
      .post('/label/createlabel')
      .send(data.addlabel)
      .set(data.headers)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('Empty label testing', (done) => {
    chai.request(server)
      .post('/label/createlabel')
      .send(data.emptylabel)
      .set(data.headers)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('token is invalid', (done) => {
    chai.request(server)
      .post('/label/createlabel')
      .set(data.invalidtoken.headers)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

