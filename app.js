const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send(process.env.mongoURI || 'Hello world'));

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
