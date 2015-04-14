/*
  Test the functionality offered by db-mysql.
*/

'use strict';

var db = require('./db-mysql.sample.js'),
should = require('should');

describe('Test functionality offered by db-mysql 3/3', function() {

    it("db.remove(): Should remove all matching records from a table.", function() {
        db.remove('people', {profession: 'Video Game Critic'}, function(err, pass) {
            pass.should.equal(true);
        });
    });

    it("db.drop(): Should drop the named table.", function() {
        db.drop('people');
    });
});
