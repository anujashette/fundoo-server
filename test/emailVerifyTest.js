let mongoose = require("mongoose");
let Users = require('../app/model/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let fs = require('fs')
chai.use(chaiHttp);
path = require('path'),    

filePath = path.join(`${__dirname}/data.json`);chai.use(chaiHttp);
var data = fs.readFileSync(filePath)
data = JSON.parse(data)

describe('Users', () => {

    it('Email verification using token', (done) => {
      chai.request(server)
          .get('/user/authorization')
          .set(data.headers)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('token is invalid', (done) => {
        chai.request(server)
            .get('/user/authorization')
            .set(data.invalidtoken.headers)
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });
});

