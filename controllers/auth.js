const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();
const User = require("../models/user");

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: "User already exists!"
        });
    const user = await User(req.body);
    await user.save();
    res.status(200).json({ user });
};

exports.signin = (req, res) => {

    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "User doesn't exist. Please Signup!!"
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password doesn't match"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 9999 });
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email } });

    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout Success!!" });
};

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
});