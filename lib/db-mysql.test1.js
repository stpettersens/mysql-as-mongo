/*
  Test the functionality offered by db-mysql.
*/

'use strict';

var db = require('./db-mysql.sample.js'),
should = require('should');

describe('Test functionality offered by db-mysql 1/3', function() {

    it("db.open(): Should create named database if it doesn't already exist.", function() {
        db.open(function(err, pass) {
            pass.should.equal(true);
        });
    });

    it("db.insertOne(): Should insert a record into a table; creating it first if necessary.", 
    function() {

        var person = {
            id: 1,
            forename: 'Jeff',
            surname: 'Gerstmann',
            profession: 'Video Game Critic',
            website: 'http://www.giantbomb.com',
            createdAt: new Date()
        }
        db.insertOne('people', person, function(err, pass) {
            pass.should.equal(true);
        });
    });
});
