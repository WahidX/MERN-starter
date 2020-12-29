const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../configs/environment');
const bcrypt = require('bcrypt');
const { transporter } = require('../../configs/nodemailer');

module.exports.createUser = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.status(422).json({
        message: "Passwords didn't match!",
      });
    }

    let user = await User.findOne({
      email: req.body.email,
      type: req.body.type,
    });
    if (user) {
      return res.status(422).json({
        message: 'Email is already registered',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      type: req.body.type,
    });

    newUser.password = null;

    let tokenToSend;
    jwt.sign(
      { _id: newUser._id },
      env.jwt_secret,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) {
          console.log('Err: ', err);
          return res.status(500).json({
            message: 'Internal Server Error',
          });
        }

        const url = `${env.base_url}/api/${env.api_v}/auth/econfirmation/${token}`;
        tokenToSend = token;

        transporter.sendMail({
          to: newUser.email,
          subject: 'Confirm Email',
          html: `<h2>Hi, ${newUser.name}, <p>Please confirm your email.</p><p><a href=${url}>Click Here</a></p></h2>`,
        });
      }
    );

    return res.status(200).json({
      message: 'User created Successfully',
      user: newUser,
      token: tokenToSend,
    });
  } catch (err) {
    console.log('Err:  ', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({
      email: req.body.email,
      type: req.body.type,
    }).select('name _id email password type bio avatar contact subject');

    if (user) {
      let isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        user.password = null;

        return res.status(200).json({
          message: "Sign in successful, here's your token",
          user: user,
          token: jwt.sign({ _id: user._id }, env.jwt_secret, {
            expiresIn: '100000000',
          }),
        });
      }
    }

    return res.status(422).json({
      message: 'Incorrect email/password',
    });
  } catch (err) {
    console.log('Err : ', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.updateUser = async function (req, res) {
  if (!req.body.email || !req.body.name || !req.body.type) {
    return res.status(404).json({
      message: 'Wrong update content',
    });
  }

  try {
    // Checking the email is available or not
    let user = await User.findOne({
      email: req.body.email,
      type: req.body.type,
    }).select('_id name email avatar bio type subject contact');

    if (user) {
      if (user.id !== req.user.id) {
        return res.status(404).json({
          message: 'Email already registered',
        });
      }
    } else {
      // Actual owner which will be updated
      user = await User.findById(req.user._id).select(
        '_id name email avatar bio type subject contact'
      );
    }

    // Checking the contact is available or not
    let userForContact = await User.findOne({
      contact: req.body.contact,
      type: req.body.type,
    }).select('_id name email avatar bio type subject contact');

    if (userForContact) {
      if (user.id !== userForContact.id) {
        return res.status(404).json({
          message: 'Same Contact already registered',
        });
      }
    }

    // Updating
    let changed = false;

    if (user.name !== req.body.name) {
      user.name = req.body.name;
      changed = true;
    }

    if (user.email !== req.body.email) {
      user.email = req.body.email;
      changed = true;
    }

    if (user.avatar !== req.body.avatar) {
      user.avatar = req.body.avatar;
      changed = true;
    }

    if (user.bio !== req.body.bio) {
      user.bio = req.body.bio;
      changed = true;
    }

    if (user.subject !== req.body.subject) {
      user.subject = req.body.subject;
      changed = true;
    }

    if (user.contact !== req.body.contact) {
      user.contact = req.body.contact;
      changed = true;
    }

    if (changed) {
      await user.save();
    }

    return res.status(200).json({
      message: 'user updated successfully',
      user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(501).json({
      message: 'Internal server error',
    });
  }
};

module.exports.confirmEmail = async function (req, res) {
  // '/econfirmation/:jwt'
  try {
    const jwtContent = jwt.verify(req.params.jwt, env.jwt_secret);
    let user = await User.findById(jwtContent._id);
    if (user) {
      user.emailAuthenticated = true;
      user.save();

      return res.redirect('http://localhost:3000');
    } else {
      return res.status(422).json({
        message: 'Token expired please initiate again',
      });
    }
  } catch (err) {
    console.log('Err: ', err);
    return res.status(501).json({
      message: 'Internal Server Error',
    });
  }
};
