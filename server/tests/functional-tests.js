const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Login tests", function () {
    test("Login with valid username and password", function (done) {
      chai
        .request(server)
        .post("/api/login")
        .set("content-type", "application/json")
        .send(
          JSON.stringify({
            username: "user1",
            password: "qwerty",
          })
        )
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "username");
          assert.equal(res.body.username, "user1");
          assert.property(res.body, "id");
          assert.equal(res.body.id, 1);
          done();
        });
    });
    test("Login with invalid username", function (done) {
      chai
        .request(server)
        .post("/api/login")
        .set("content-type", "application/json")
        .send(
          JSON.stringify({
            username: "fakeUser",
            password: "qwerty",
          })
        )
        .end(function (err, res) {
          assert.equal(res.status, 401);
          assert.equal(res.body.text, "Unauthorized");
          done();
        });
    });
    test("Login with invalid password", function (done) {
      chai
        .request(server)
        .post("/api/login")
        .set("content-type", "application/json")
        .send(
          JSON.stringify({
            username: "user1",
            password: "wrongPassword",
          })
        )
        .end(function (err, res) {
          assert.equal(res.status, 401);
          assert.equal(res.body.text, "Unauthorized");
          done();
        });
    });
    test("Logout", function (done) {
      chai
        .request(server)
        .get("/api/logout")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, "OK");
          done();
        });
    });
  });
});
