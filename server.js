const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./configs/mongoose');
const passport = require('passport');
const passportJWT = require('./configs/passport-jwt-strategy');
const cors = require('cors');

// to allow react to hit the apis
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use('/uploads', express.static(__dirname + '/uploads'));

// Decode post reqs
app.use(express.urlencoded());

// Middlewares
app.use(passport.initialize());

// Router
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Message from server',
  });
});

app.use('/api', require('./api/'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running server: ${err}`);
  }

  console.log(`Server running at ${port}`);
});
