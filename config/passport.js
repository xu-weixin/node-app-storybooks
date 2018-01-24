const GitHubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { GithubClientID, GithubClientSecret } = require('./keys');

// load user model
const User = mongoose.model('user');

module.exports = function(passport) {
  // github
  passport.use(
    new GitHubStrategy(
      {
        clientID: GithubClientID,
        clientSecret: GithubClientSecret,
        callbackURL: '/auth/github/callback',
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          githubId: profile.id,
          email: profile.emails[0].value,
          username: profile.username,
          image: profile.photos[0].value
        };

        User.findOne({ githubId: profile.id }).then(user => {
          if (user) {
            // return user
            done(null, user);
          } else {
            // add user
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );
  /*
  // local
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // 匹配用户名
      User.findOne({ email }).then(user => {
        if (!user) {
          return done(null, false, { message: '用户不存在！' });
        }
        // 匹配密码
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: '密码错误！' });
          }
        });
      });
    })
  );
*/

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
  );
};
