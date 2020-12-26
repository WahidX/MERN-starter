const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  return res.status(200).json({
    message: 'API running fine',
  });
});

router.use('/v1', require('./v1'));

console.log('router loaded');

module.exports = router;
