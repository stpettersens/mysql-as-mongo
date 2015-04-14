/*
  MySQL as MongoDB backend configuration for your Node.js projects.

  Based on a sample configuration for MongoDB.

  Portions copyright (c) 2015 Sam Saint-Pettersen.
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
    password: '//*PASSWORD*//',
    multipleStatements: true
    , debug: true
});

module.exports = {
  findMax: function(name, column, callback) {
    connection.query(sprintf('SELECT MAX(%s) AS max FROM %s.%s', column, schema, name), 
    function(err, result) {
      callback(null, result[0].max);
    });
  },
  find: function(name, query, limit, callback) {
    var field = Object.keys(query).map(function(k) { return k; });
    var value = Object.keys(query).map(function(k) { return query[k] });
    var sql = 'SELECT * FROM %s.%s WHERE %s = %d ORDER BY _id DESC LIMIT %d';
    if(typeof(value[0]) == 'string') {
      sql = 'SELECT * FROM %s.%s WHERE %s = "%s" ORDER BY _id DESC LIMIT %d';
    }
    connection.query(sprintf(sql, schema, name, field[0], value[0], limit), function(err, results) {
        if(results.length > 0) {
          callback(null, results);
        }
        else {
          callback('error', false);
        }
    });
  },
  findOne: function(name, query, callback) {
    var field = Object.keys(query).map(function(k) { return k; });
    var value = Object.keys(query).map(function(k) { return query[k] });
    var sql = 'SELECT * FROM %s.%s WHERE %s = %d ORDER BY _id DESC LIMIT 1';
    if(typeof(value[0]) == 'string') {
      sql = 'SELECT * FROM %s.%s WHERE %s = "%s" ORDER BY _id DESC LIMIT 1';
    }
    connection.query(sprintf(sql, schema, name, field[0], value[0]), function(err, result) {
        if(result.length > 0) {
          callback(null, result[0]);
        }
        else {
          callback('error', false);
        }
    });
  },
  insert: function(name, items, callback) {
    // TODO
  },
  insertOne: function(name, item, callback) {
    var a_cols  = Object.keys(item).map(function(k) { return k; });
    var a_items = Object.keys(item).map(function(k) { return item[k] });
    var columns = '';
    var inserts = '';
    for(var i = 0; i < a_cols.length; i++) {
        if(typeof(a_items[i]) == 'string') {
          if(i == a_cols.length - 1) columns += sprintf('%s VARCHAR(50) NOT NULL', a_cols[i]);
          else columns += sprintf('%s VARCHAR(50) NOT NULL, ', a_cols[i]);
        }
        else if(typeof(a_items[i]) == 'number') {
          if(i == a_cols.length - 1) columns += sprintf('%s NUMERIC(15, 2) NOT NULL', a_cols[i]);
          else columns += sprintf('%s NUMERIC(15, 2) NOT NULL, ', a_cols[i]);
        }
        else if(typeof(a_items[i]) == 'object') {
          if(i == a_cols.length - 1) columns += sprintf('%s TIMESTAMP NOT NULL', a_cols[i]);
          else columns += sprintf('%s TIMESTAMP NOT NULL, ', a_cols[i]);
        }
    }
    for(var i = 0; i < a_items.length; i++) {
        if(typeof(a_items[i]) == 'string' || typeof(a_items[i]) == 'object') {
          if(typeof(a_items[i]) == 'object') {
            a_items[i] = a_items[i].toISOString().slice(0, 19).replace('T', ' ');
          }
          if(i == a_items.length - 1) inserts += sprintf('\'%s\'', a_items[i]);
          else inserts += sprintf('\'%s\', ', a_items[i]);
        }
        else {
          if(i == a_items.length - 1) inserts += sprintf('%d', a_items[i]);
          else inserts += sprintf('%d, ', a_items[i]);
        }
    }
    connection.query(sprintf('CREATE TABLE IF NOT EXISTS %s.%s (_id VARCHAR(30) NOT NULL PRIMARY KEY, %s); INSERT INTO %s.%s VALUES (\'%s\', %s)', schema, name, columns, schema, name, new ObjectID().toString(), inserts));
    callback(null, true);
  },
  remove: function(name, query, callback) {
    var field = Object.keys(query).map(function(k) { return k; });
    var value = Object.keys(query).map(function(k) { return query[k] });
    var sql = 'DELETE FROM %s.%s WHERE %s = %d';
    if(typeof(value[0]) == 'string') {
      sql = 'DELETE FROM %s.%s WHERE %s = "%s"';
    }
    connection.query(sprintf(sql, schema, name, field[0], value[0]), function(err, pass) {
      callback(null, true);
    });
  },
  open: function(callback) {
    connection.query(sprintf('CREATE DATABASE IF NOT EXISTS %s', schema));
    callback(null, true);
  },
  push: function(name, id, updateQuery, callback) {
    //db.collection(name).update({_id: id}, {$push: updateQuery}, {safe:true}, callback);
  },
  drop: function(name) {
    connection.query(sprintf('DROP TABLE IF EXISTS %s.%s', schema, name));
  }
}
