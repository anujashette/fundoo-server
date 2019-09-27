let mongoose = require("mongoose");
let Users = require('../app/model/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let fs = require('fs')

chai.use(chaiHttp);
filePath = path.join(`${__dirname}/data.json`);chai.use(chaiHttp);
var data = fs.readFileSync(filePath)
data = JSON.parse(data)

describe('Users API testing', () => {

    it('User registration', (done) => {
      chai.request(server)
          .post('/user/register')
          .send(data.user)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('User invalid input', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(data.userinvalid)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      });

      it('it should POST a user already exist', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(data.userexist)
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });
});

