const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || 'test-client-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'test-client-secret',
      callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // We don't need to store users in the database for this project —
      // the profile from GitHub is enough to prove the request is authenticated.
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
