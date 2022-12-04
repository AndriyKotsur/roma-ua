const bcrypt = require('bcryptjs');

const before = async (request) => {
  if (request.method === 'post') {
    const { password, ...otherParams } = request.payload;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return {
        ...request,
        payload: {
          ...otherParams,
          hashedPassword,
        },
      };
    }
  }
  return request;
};

const after = async (response) => {
  if (response.record && response.record.errors && response.record.errors.hashedPassword) {
    response.record.errors.password = response.record.errors.hashedPassword;
  }
  return response;
};

module.exports = { before, after };
