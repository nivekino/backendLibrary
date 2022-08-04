const login = (req, res) => {
  return new Promise(async (resolve, reject) => {
    if (!req.body.user || !req.body.password) {
      resolve(res.status(400).json({ message: "Missing data" }));
    } else {
      resolve(res.status(200).json({ message: "User login" }));
    }
  });
};

const register = (req, res) => {
  return new Promise(async (resolve, reject) => {
    resolve(res.status(200).json({ message: "User created" }));
  });
};

exports.login = login;
exports.register = register;
