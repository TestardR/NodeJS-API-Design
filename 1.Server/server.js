// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require('express');

const app = express();
const port = 3000;
const jsonData = { count: 12, message: 'hey' };

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send(jsonData));

app.get('/index', (req, res) =>
  // res.sendFile takes an absolute path to a file and sets the mime type based on the fil exact name
  res.sendFile(__dirname + '/index.html', function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
);
