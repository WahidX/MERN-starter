const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});

const development = {
  name: 'development',
  api_v: process.env.AUTH_API_V,
  base_url: process.env.AUTH_BASE_URL,
  db: 'academic-dev',
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ADDR,
      pass: process.env.MAIL_PASS,
    },
  },
  google_client_id: '',
  google_client_secret: '',
  google_callback_url: 'http://localhost:8000/auth/google/callback',
  jwt_secret: 'super-secret-key',
  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream },
  },
};

const production = {
  name: process.env.ACADEMIC_ENVIRONMENT,
  api_v: process.env.AUTH_API_V,
  base_url: process.env.AUTH_BASE_URL,
  db: process.env.ACADEMIC_DB,
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ADDR,
      pass: process.env.MAIL_PASS,
    },
  },
  google_client_id: process.env.ACADEMIC_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.ACADEMIC_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.ACADEMIC_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.ACADEMIC_JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};

module.exports = development;
// module.exports =
//   eval(process.env.ACADEMIC_ENVIRONMENT) == undefined
//     ? development
//     : eval(process.env.ACADEMIC_ENVIRONMENT);
