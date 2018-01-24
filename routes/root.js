const express = require('express');

const { ensureAuthenticated } = require('../helpers/auth');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/about', (req, res) => res.render('about'));
router.get('/dashbord', ensureAuthenticated, (req, res) =>
  res.render('dashbord')
);

module.exports = router;
