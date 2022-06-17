const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const { User } = require('../models');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // verificate if email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'User not exists',
      });
    }

    // check out password
    const validPassword = bcrypt.compareSync(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Email or password are incorred',
      });
    }

    // Generar JWT
    const token = await generateJWT(user.name, user.id);

    return res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Talk to administrator',
    });
  }
};

const signIn = async (req, res) => {
  const { password } = req.body;

  try {
    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.name, user.id);

    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Login failed!',
    });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  // Generar JWT
  const token = await generateJWT(name, uid);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  signIn,
  login,
  renewToken,
};
