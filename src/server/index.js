const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const server = express();
// the value for dbname should match your database name
const dbname = 'moviesdb';

// serve files from the dist directory
server.use(express.static('dist'));

// the URL to the DB will be loaded from an env variable or using the MongoDB Clour
const dbroute = process.env.MONGODB_URL || `mongodb+srv://userdb:19738246@cluster0.w3psa.mongodb.net/moviesdb?retryWrites=true&w=majority`;

let db;

// connect to the DB and then start the expres server
MongoClient.connect(dbroute, (err, client) => {
  if (err) throw err;

  db = client.db(dbname);
  // start the express web server listening
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// DEFINE ENDPOINTS

// retrieve all movie objects from DB
server.get('/api/movies', (req, res) => {
  db.collection('movies').find().toArray((err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// retrieve movie with specific ID from DB
server.get('/api/movies/:id', (req, res) => {
  db.collection('movies').findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// delete movie with specific ID from DB
server.delete('/api/movies', (req, res) => {
  db.collection('movies').deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// create new movie based on info supplied in request body
server.post('/api/movies', (req, res) => {
  db.collection('movies').insertOne(req.body, (err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

// update movie based on info supplied in request body
server.put('/api/movies', (req, res) => {
  // get the ID of the movie to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a movie matching this ID and update their details
  db.collection('movies').updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});
