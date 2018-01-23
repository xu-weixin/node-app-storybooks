const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// load routers
const auth_router = require('./routes/auth');
app.use('/auth', auth_router);

app.get('/', (req, res) => res.send('Hello world'));

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
