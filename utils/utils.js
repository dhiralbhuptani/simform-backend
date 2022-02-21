const bcryptjs = require('bcryptjs');

exports.securePassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};