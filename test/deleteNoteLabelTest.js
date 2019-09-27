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

describe('Delete label in note api testing', () => {

    it('Delete label in note', (done) => {
      chai.request(server)
          .put('/note/deletenotelabel')
          .send(data.addLabelToNote)
          .set(data.headers)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('delete wrong label in note', (done) => {
        chai.request(server)
            .put('/note/deletenotelabel')
            .send(data.wrongLabelToNote)
            .set(data.headers)
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });

  it('token is invalid', (done) => {
    chai.request(server)
    .put('/note/deletenotelabel')
    .set(data.invalidtoken.headers)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});