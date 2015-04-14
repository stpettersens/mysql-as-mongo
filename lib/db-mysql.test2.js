/*
  Test the functionality offered by db-mysql.
*/

'use strict';

var db = require('./db-mysql.sample.js'),
should = require('should');

describe('Test functionality offered by db-mysql 2/3', function() {

    it("db.findOne(): Should find a matching record from a table.", function() {
        db.findOne('people', {surname: 'Gerstmann'}, function(err, result) {
            console.log(result);
            result.should.be.instanceOf(Object);
            result.forename.should.equal('Jeff');
        });
    });

    it("db.find(): Should find all matching records from a table.", function() {
        db.find('people', {profession: 'Video Game Critic'}, 5, function(err, results) {
            console.log(results);
            results.should.be.instanceOf(Array);
        });
    });

    it("db.findMax(): Find the highest value in a table column.", function() {
        db.findMax('people', 'id', function(err, max) {
            console.log(max);
            max.should.be.instanceOf(Number);
        })
    });
});
