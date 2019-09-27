let mongoose = require("mongoose");
let Users = require('../app/model/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let fs = require('fs')
path = require('path')

chai.use(chaiHttp);
filePath = path.join(`${__dirname}/data.json`);
var data = fs.readFileSync(filePath)
data = JSON.parse(data)

describe('Label api testing', () => {

  it('Delete label testing', (done) => {
    chai.request(server)
      .delete('/label/deletelabel')
      .send(data.deleteLabel)
      .set(data.headers)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('delete with wrong label id testing', (done) => {
    chai.request(server)
      .delete('/label/deletelabel')
      .send(data.wrongLabel)
      .set(data.headers)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('token is invalid', (done) => {
    chai.request(server)
      .delete('/label/deletelabel')
      .set(data.invalidtoken.headers)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

