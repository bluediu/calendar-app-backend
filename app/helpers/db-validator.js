const User = require('../models');

const doesEmailExist = async (email = '') => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(
      `That email: ${email}, already was taken, please try another`
    );
  }
};

module.exports = { doesEmailExist };
