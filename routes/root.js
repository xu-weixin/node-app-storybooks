const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');

const { ensureAuthenticated } = require('../helpers/auth');
const router = express.Router();

require('../models/User');
const User = mongoose.model('user');

router.get('/', (req, res) => res.render('index'));
router.get('/about', (req, res) => res.render('about'));
router.get(
  '/login',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      req.flash('success_msg', '请勿重复登录！');
      res.redirect('/');
    }
  },
  (req, res) => {
    console.log(req);
    res.render('root/login', { body: req.body });
  }
);
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});
router.get(
  '/register',
  (req, res, next) => {
    console.log(req.body);
    if (!req.isAuthenticated()) {
      return next();
    } else {
      req.flash('success_msg', '请勿重复注册！');
      res.redirect('/');
    }
  },
  (req, res) => {
    res.render('root/register');
  }
);
router.post('/register', (req, res) => {
  const errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: '两次密码不匹配！' });
  } else if (req.body.password.length < 6) {
    error.push({ text: '密码长度小于规定值' });
  }
  if (errors.length) {
    res.render('root/register', {
      errors,
      body: req.body
    });
  } else {
    User.findOne({ email: req.body.email }).then(result => {
      if (result) {
        res.render('root/register', {
          errors: [{ text: '此邮箱已被注册！' }],
          body: req.body
        });
      } else {
        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            new User(newUser)
              .save()
              .then(() => {
                req.flash('success_msg', '注册成功！请重新登录。');
                res.redirect('/');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', '注销成功！');
  res.redirect('/');
});
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('root/dashboard')
);

module.exports = router;
