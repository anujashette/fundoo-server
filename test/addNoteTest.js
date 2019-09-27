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

describe('Note api testing', () => {

  it('Add note testing', (done) => {
    chai.request(server)
      .post('/note/addnote')
      .send(data.addnote)
      .set(data.headers)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('Add empty title note testing', (done) => {
    chai.request(server)
      .post('/note/addnote')
      .send(data.addemptytitle)
      .set(data.headers)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('token is invalid', (done) => {
    chai.request(server)
      .post('/note/addnote')
      .set(data.invalidtoken.headers)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

});

