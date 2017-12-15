const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000; // changed port as something else was already running (also an issue with my mongod 27018, don't forget to change the mongo server port as well...both use --port flags)

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth-users', {
  useMongoClient: true
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
