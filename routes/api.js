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
var shortId = require("shortid")

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
     //    _id: shortId.generate,
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
            // issue._id = shortId.generate;
             
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
   //       res.send({_id: issue._id} );
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
