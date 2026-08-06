const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start GitHub OAuth flow
router.get('/github', passport.authenticate('github'));

// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.status(200).json({ message: 'Logged in successfully', user: req.user });
  }
);

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'GitHub authentication failed' });
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

router.get('/status', (req, res) => {
  res.status(200).json({ authenticated: !!(req.isAuthenticated && req.isAuthenticated()) });
});

module.exports = router;
