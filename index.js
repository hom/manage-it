const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'dist', 'index.html')).pipe(res);
})

let port = process.env.MANAGE_IT_PORT || 10987;
app.listen(port, () => {
  console.log(`Manage-it is running on port: ${port}`);
})