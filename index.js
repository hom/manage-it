// manage-it server side entry pointer
const express = require('express');
const path = require('path');
const fs = require('fs');

// create app instance
let app = express();

// parse body data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// serve the static resource
app.use(express.static(path.join(__dirname, 'dist')));

// default router entry
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'dist', 'index.html')).pipe(res);
})

app.get('/config', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  fs.createReadStream(path.join(__dirname, 'manage-it-config.json')).pipe(res);
})

// The port of server listening on
let port = process.env.MANAGE_IT_PORT || 10987;
app.listen(port, () => {
  console.log(`Manage-it is running on port: ${port}`);
})