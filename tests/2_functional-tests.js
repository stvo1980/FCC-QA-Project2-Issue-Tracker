/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  
  var idTest;
  suite("POST /api/issues/{project} => object with issue data", function() {
    test("Every field filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');
        idTest = res.body._id;
          assert.equal(res.type, "application/json", "Response should be json");
          assert.equal(res.body.issue_title, "Title", "");
          assert.equal(res.body.issue_text, "text", "");
          assert.equal(
            res.body.created_by,
            "Functional Test - Every field filled in",
            ""
          );
          assert.equal(res.body.assigned_to, "Chai and Mocha", "");
          assert.equal(res.body.status_text, "In QA", "");

          done();
        });
    });

    test("Required fields filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
        assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');
         idTest = res.body._id;
          assert.equal(res.type, "application/json", "Response should be json");
          assert.equal(res.body.issue_title, "Title", "");
          assert.equal(res.body.issue_text, "text", "");
          assert.equal(
            res.body.created_by,
            "Functional Test - Every field filled in",
            ""
          );
         

          done();
        });
    });

    test("Missing required fields", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "",
          issue_text: "",
          created_by: ""
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "missing inputs");

          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => text", function() {
   // test("No body", function(done) {
  //   chai
   //     .request(server)
   //     .post("/api/issues/test")
   //      .send({_id: idTest})
   //   console.log("id", idTest)
   //     .end(function(err, res) {
    //      assert.equal(res.status, 200);
     //     assert.equal(res.text, "no updated field sent");
   //       done();
   //     });
      
       test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({_id: idTest})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no updated field sent');
          done();
        });        
      });
      
  //  });

    
    
    
    test("One field to update", function(done) {});

    test("Multiple fields to update", function(done) {});
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function() {
      test("No filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });

      test("One filter", function(done) {});

      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function(done) {});
    }
  );

  suite("DELETE /api/issues/{project} => text", function() {
    test("No _id", function(done) {});

    test("Valid _id", function(done) {});
  });
});
