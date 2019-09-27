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

describe('Users', () => {

    it('', (done) => {
      chai.request(server)
          .put('/user/reset')
          .set(data.headers)
          .send(data.reset)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

    it('Must be 6 characters password', (done) => {
        chai.request(server)
            .put('/user/reset')
            .set(data.headers)
            .send(data.resetpassinvalid)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      });
      
});
