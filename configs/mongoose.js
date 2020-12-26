const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(
  `mongodb+srv://droidx:jLUg0d1yHZbJRylv@academic-cluster.1gsoa.mongodb.net/${env.db}?retryWrites=true&w=majority`,
  //   process.env.ACADEMIC_MONGODB_URI || `mongodb://localhost/${env.db}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting mongodb'));

db.once('open', function () {
  console.log('Connected to mongoDB');
  console.log(`MONGO: using db: ${env.db}`);
});

module.exports = db;

// `mongodb+srv://droidx:jLUg0d1yHZbJRylv@academic-cluster.1gsoa.mongodb.net/${env.db}?retryWrites=true&w=majority`
