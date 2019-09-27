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

    it('Read note testing', (done) => {
      chai.request(server)
          .get('/note/readnote?')
          .set(data.headers)
          .query({pageNo:'1',size:'5'})
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
    
  it('token is invalid', (done) => {
      chai.request(server)
      .get('/note/readnote')
      .set(data.invalidtoken.headers)
          .end((err, res) => {
              res.should.have.status(422);
              done();
          });
  });
});