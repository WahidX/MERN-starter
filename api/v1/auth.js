const express = require('express');
const router = express.Router();

const passport = require('passport');
const authAPI = require('../../controllers/v1/auth');

router.post('/create-user', authAPI.createUser);

router.post('/create-session', authAPI.createSession);

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  authAPI.updateUser
);

// Email confirmation apis
router.get('/econfirmation/:jwt', authAPI.confirmEmail);
// router.get('/pconfirmation/:jwt', );

router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    res.status(200).json({
      message: "Here's user details",
      data: {
        user: req.user,
      },
    });
  }
);

module.exports = router;

// passport.authenticate('jwt', { session: false }),
