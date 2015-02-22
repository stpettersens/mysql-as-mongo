# mysql-as-mongo
Use MySQL in Node.js as if it was MongoDB. 
Drop in replacement for MongoDB database code.

That is, you can use JSON / CSON / JavaScript objects to insert data into a MySQL backend.

For example:

```
var _pineapple = { name: 'Pineapple', genus: 'Ananas comosus', nativeTo: 'South America' };
db.insertOne('fruit', _pineapple, function(err, pineapple) {`
  console.log('Added %s (%s) to fruit schema.', pineapple.name, pineapple.genus);`
}
```

will be converted by `db-mysql.js` to this SQL and stored in a MySQL schema:

```
INSERT INTO fruit (_id, name, genus, nativeTo) 
VALUES ('54e64cbed9bd98fc247c7b6f', 'Pineapple', 'Ananas comosus', 'South America')
```
