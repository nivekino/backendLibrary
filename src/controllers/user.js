const uuid = require("uuid");
const UserModel = require("../models/UserModel");
const { to } = require("../libs/to/to");
const bcrypt = require("bcrypt");

const hashPassword = (plainTextPwd, done) => {
  bcrypt.hash(plainTextPwd, 10, (err, hash) => {
    done(err, hash);
  });
};

const hashPasswordSync = (plainTextPwd) => {
  return bcrypt.hashSync(plainTextPwd, 10);
};

const comparePassword = (plainPassword, hashPassword, done) => {
  bcrypt.compare(plainPassword, hashPassword, done);
};

const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let { name, lastName, email, role, password } = data;
    UserModel.findOne({
      email: email,
    })
      .then((user) => {
        if (user.length > 0) {
          return reject("Email already in use");
        } else {
          let hashePwd = crypt.hashPasswordSync(password);
          let userId = uuid.v4();
          let newUser = new UserModel({
            userId: userId,
            name: name,
            lastName: lastName,
            email: email,
            role: role,
            password: hashePwd,
          });
          newUser.save();
          resolve(
            res.status(200).json({ message: "User created susscefully" })
          );
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUser = (UserId) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(UserModel.findOne({ userId: UserId }).exec());
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
};

const getUserIdFromEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    });
  });
};

const checkUserCredentials = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(getUserIdFromEmail(email));
    if (!err || user) {
      comparePassword(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      reject(err);
    }
  });
};

exports.registerUser = registerUser;
exports.getUser = getUser;
exports.getUserIdFromEmail = getUserIdFromEmail;
exports.checkUserCredentials = checkUserCredentials;
