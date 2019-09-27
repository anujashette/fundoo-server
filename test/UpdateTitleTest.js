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

    it('Update note title testing', (done) => {
      chai.request(server)
          .put('/note/updatetitle')
          .send(data.updateTitle)
          .set(data.headers)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('Note title not updated testing', (done) => {
        chai.request(server)
            .put('/note/updatetitle')
            .send(data.notitle)
            .set(data.headers)
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });

      it('Note empty title testing', (done) => {
        chai.request(server)
            .put('/note/updatetitle')
            .send(data.updateemptytitle)
            .set(data.headers)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      });
  
    it('token is invalid', (done) => {
        chai.request(server)
        .put('/note/updatetitle')
        .set(data.invalidtoken.headers)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
        });
});