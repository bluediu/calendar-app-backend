const jwt = require('jsonwebtoken');

/**
 * It takes a name and an optional uid, creates a payload, signs the payload with a secret key, and
 * returns a promise that resolves with a token
 * @param {name: string} - the name of the user
 * @param {uid: string} - The user ID of the user who is logging in.
 * @returns A promise that resolves to a token.
 */
const generateJWT = (name, uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '192h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('it could not generate jwt');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
