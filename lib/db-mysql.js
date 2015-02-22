/*
  MySQL as Mongo DB backend configuration for your Node.js projects.

  Based on a sample configuration for MongoDB.

  Portions (c) 2015 Sam Saint-Pettersen.
  Released under the X11/MIT License.

  Please see LICENSE file.
*/

'use strict';

var mysql = require('mysql');
var ObjectID = require('mongodb').ObjectID;
var sprintfjs = require('sprintf.js');

var schema = '//*SCHEMA*//';

var connection = mysql.createConnection({
    host: '//*HOST*//',
    user: '/*USER*//',
    password: '//*PASSWORD*//'
});

module.exports = {
  find: function(name, query, limit, callback) {
    //db.collection(name).find(query).sort({_id: -1}).limit(limit).toArray(callback);
  },
  findOne: function(name, query, callback) {
    //db.collection(name).findOne(query, callback);
  },
  insert: function(name, items, callback) {
    //db.collection(name).insert(items, callback);
  },
  insertOne: function(name, item, callback) {
    var a_items = Object.keys(item).map(function(k) { return item[k] });
    var inserts = '';
    for(var i = 0; i < a_items.length; i++) {
        if(i == a_items.length - 1) inserts += sprintf('\'%s\'', a_items[i]);
        else inserts += sprintf('\'%s\', ', a_items[i]);
    }
    connection.query(sprintf('INSERT INTO %s VALUES (NULL, %s)', name, inserts));
    var callback = function() {};
    return callback;
  },
  open: function(schema, callback) {
    connection.query(sprintf('CREATE DATABASE IF NOT EXISTS %s', schema));
     var callback = function() {};
     return callback;
  },
  push: function(name, id, updateQuery, callback) {
    //db.collection(name).update({_id: id}, {$push: updateQuery}, {safe:true}, callback);
  },
  drop: function(name) {
    connection.query(sprintf('DROP TABLE IF EXISTS %s', name));
  }
}
