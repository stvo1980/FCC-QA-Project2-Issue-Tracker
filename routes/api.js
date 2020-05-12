/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var shortId = require("shortid");


const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function(app, db) {
  app
    .route("/api/issues/:project")

    .get(function(req, res) {
      var project = req.params.project;
    })

    .post(function(req, res) {
      var project = req.params.project;
 //     console.log(project);
      var issue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || "",
        //    _id: shortId.generate,
        open: true,
        status_text: req.body.status_text || ""
      };
      if (!issue.issue_title || !issue.issue_text || !issue.created_by) {
        res.send("missing inputs");
      } else {
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          var db = db.db("test");
          var collection = db.collection(project);
          collection.insertOne(issue, function(err, doc) {
            //      issue._id = doc.insertedId;
            res.json({
                   _id: issue._id,
              issue_title: issue.issue_title,
              issue_text: issue.issue_text,
              created_on: issue.created_on,
              updated_on: issue.updated_on,
              created_by: issue.created_by,
              assigned_to: issue.assigned_to,
              open: issue.open,
              status_text: issue.status_text
            });
            console.log("DB updated");
          });
        });
      }
    })

    .put(function(req, res) {
      var project = req.params.project;
      var issue = req.body._id;
      delete req.body._id;
//console.log("project",project);
      var updates = req.body;

      for (var i in updates) {
        if (!updates[i]) {
          delete updates[i];
        }
      }
 //     console.log("updates", updates);
      //     console.log(updates);
      updates.updated_on = new Date();

  //    console.log("length", Object.keys(updates).length);

      if (Object.keys(updates).length < 2) {
        res.send("no updated field sent");
      } else {
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          var db = db.db("test");
          var collection = db.collection(project);

          collection.findOneAndUpdate(
            { _id: new ObjectId(issue) },
            //     [['_id',1]],
            { $set: updates },
            //    {new: true},
            function(err, doc) {
              !err
                ? res.send("successfully updated")
                : res.send("could not update " + issue + " " + err);
            }
          );
        });
      }
    })
.delete(function (req, res){
      var project = req.params.project;
    console.log("deletenew",project)
    
    
    
    var issue = req.body._id;
      if (!issue) {
        res.send('_id error');
      } else {
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
         var db = db.db("test");
          var collection = db.collection(project);
          collection.findOneAndDelete({_id:new ObjectId(issue)},function(err,doc){
            (!err) ? res.send('deleted '+issue) : res.send('could not delete '+issue+' '+err);
          });
        });
      }
    
  
   
    
    
    
    });
    
};

  

  
    
