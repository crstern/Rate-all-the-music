const User = require('./user.model');
const db = require('./db')


const createTables = async () => {
  await User.sync();
}
createTables();