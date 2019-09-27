let mongoose = require("mongoose");
let Users = require('../app/model/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let fs = require('fs')

chai.use(chaiHttp);
let filePath = path.join(`${__dirname}/data.json`);
var data = fs.readFileSync(filePath)
data = JSON.parse(data)

describe('Users', () => {

    it('it should POST a user login successful', (done) => {
      chai.request(server)
          .post('/user/login')
          .send(data.userlogin)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('it should POST a user invalid input', (done) => {
        chai.request(server)
            .post('/user/login')
            .send(data.invalidinput)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      });

      it('it should POST a username or password is invalid', (done) => {
        chai.request(server)
            .post('/user/login')
            .send(data.userincorrect)
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });
});

