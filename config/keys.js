module.exports = {
  mongoURI: process.env.mongoURI || 'mongodb://localhost:27017/storybooks-dev',
  GithubClientID: process.env.GithubClientID || 'ec94491ec7149c9046ee',
  GithubClientSecret:
    process.env.GithubClientSecret || '1dd98a31efd5d4d7407e40650133c3c18fcee558'
};
