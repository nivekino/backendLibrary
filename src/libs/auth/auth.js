const userController = require("../../controllers/user");	
const jwt = require("jsonwebtoken");
const { to } = require("../to/to");

const loginUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing data" });
  } else if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Missing data" });
  }
  let [err, resp] = await to(
    userController.checkUserCredentials(req.body.email, req.body.password)
  );
  if (err || !resp) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  let user = await userController.getUserIdFromEmail(req.body.email);
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.KEY
  );
  res.status(200).json({ message: "User login successful", token: token });
};

const createUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing data" });
  } else if (
    !req.body.name ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.role ||
    !req.body.password
  ) {
    return res.status(400).json({ message: "Missing data" });
  }
  let [err, resp] = await to(userController.registerUser(req.body));

  if (err || !resp) {
    return res.status(401).json({ message: err });
  }
  res.status(200).json({ message: "User created!" });
};

const isLibrarian = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.role == 1) {
      return next();
    } else {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
    });
  }
};

exports.loginUser = loginUser;
exports.createUser = createUser;
exports.isLibrarian = isLibrarian;
