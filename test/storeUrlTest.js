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

describe('Test S3 Api', () => {

    it('s3 api test', (done) => {
      chai.request(server)
          .put('/api/file/upload')
          .type('form')
          .set(data.headers)
          .attach('photos','/home/admin1/AnujaShette/FundooNotes/server/test/asset/nature1.jpg')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('s3 api negative test', (done) => {
      chai.request(server)
          .put('/api/file/upload')
          .type('form')
          .set(data.headers)
          .attach('photos','/home/admin1/AnujaShette/FundooNotes/server/test/asset/nature.exe')
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
    
  it('token is invalid', (done) => {
      chai.request(server)
      .put('/api/file/upload')
      .set(data.invalidtoken.headers)
          .end((err, res) => {
              res.should.have.status(422);
              done();
          });
  });
});
