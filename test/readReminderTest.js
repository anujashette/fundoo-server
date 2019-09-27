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

describe('Get reminder notes api testing', () => {

    it('Read reminder notes testing', (done) => {
      chai.request(server)
          .get('/note/readremindernotes')
          .query({pageNo:'1',size:'5'})
          .set(data.headers)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

  it('token is invalid', (done) => {
      chai.request(server)
      .get('/note/readremindernotes')
      .set(data.invalidtoken.headers)
          .end((err, res) => {
              res.should.have.status(422);
              done();
          });
  });
});