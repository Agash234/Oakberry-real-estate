const Users = require("../model/userSchema");
const { encryptData, decryptData } = require("../LIB/index");
const { privatekey } = require("../config/config");
const refreshkey = process.env.REFRESH_KEY;
const jwt = require("jsonwebtoken");
const validateAgentCode =require('../utilis/validate')

exports.register = async (req, res) => {
  const { username, password, email,images,role, agentCode } = req.body;
  console.log(req.body)
  try {
    let user = await Users.findOne({ email });
    console.log(user)
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    if (role === "agent" && !validateAgentCode(agentCode)) {
      return res.status(400).json({ msg: "Invalid agent code" });
    }

    const encryptedPassword = encryptData(password);
    console.log(encryptedPassword);

    user = new Users({
      username,
      email,
      password: encryptedPassword,
      images,
      role,
      agentCode: role === "agent" ? agentCode : null, 
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  try {
    const user = await Users.findOne({ username });
    console.log(user)
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    console.log(user.password)

    const decryptedPassword = decryptData(user.password);
    console.log(decryptedPassword);
    if (decryptedPassword !== password) {
      return res.status(400).json({ msg: "Password incorrect" });
    }

    const payload = { user: user._id };
    const token = jwt.sign(payload, privatekey, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, refreshkey, {
      expiresIn: "60m",
    });
    const userRole=user.role
    const userid=user._id

    res.json({ token, refreshToken,userRole,userid });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
