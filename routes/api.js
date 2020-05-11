/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app,db) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
     
    
    
    })
    
    .post(function (req, res){
      var project = req.params.project;
    console.log(project)
       var issue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || '',
        open: true,
        status_text: req.body.status_text || ''
      };
       if(!issue.issue_title || !issue.issue_text || !issue.created_by) {
        res.send('missing inputs');
      } else {
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          
          
         var db = db.db("test");
          var collection = db.collection(project);
          collection.insertOne(issue,function(err,doc){
            issue._id = doc.insertedId;
            res.json(issue);
            console.log("DB updated")
          });
        });
      }
    
    
    
    
    
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
