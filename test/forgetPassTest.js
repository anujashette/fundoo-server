let mongoose = require("mongoose");
let Users = require('../app/model/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let fs = require('fs')
path = require('path')

filePath = path.join(__dirname, 'data.json');
chai.use(chaiHttp);
var data = fs.readFileSync(filePath)
data = JSON.parse(data)

describe('Users', () => {

    it('forget password authentication', (done) => {
      chai.request(server)
          .get('/user/forgetpass')
          .send(data.forgetpassvalid)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('Invalid input', (done) => {
        chai.request(server)
            .get('/user/forgetpass')
            .send(data.forgetpassinvalid)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      });

      it('Token is invalid', (done) => {
        chai.request(server)
            .get('/user/forgetpass')
            .send(data.forgetpassno)
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });
});
