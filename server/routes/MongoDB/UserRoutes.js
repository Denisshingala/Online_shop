const express = require("express");
const Users = require("../../models/MongoDB/Users.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../../models/MongoDB/Users.model");
const mail = require("../../utils/mongodb/mail");

const UserRoutes = express.Router();

UserRoutes.post("/create", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (null == username || null == email || null == password) {
            return res.status(200).json({ message: "Request is invalid!!" });
        }

        const user = await Users.findOne({ email: email });
        if (null != user) {
            return res.status(200).json({ message: "User already exists!!" });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new Users({
            username,
            email,
            password: hashPassword
        });

        await newUser.save()
            .then((user) => {
                res.status(200).json({ message: "User has been registered!!", status: 200, user: user });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Something went wrong!!" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Something went wrong!!" });
    }
});

UserRoutes.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (null == email || "" == email || "" == password || null == password) {
            return res.status(200).json({ message: "Invalid email address or password!!" });
        }

        const user = await Users.findOne({ email: email });
        if (null == user) {
            return res.status(200).json({ message: "Invalid user id or password!!" });
        }

        return bcrypt.compare(password, user.password)
            .then(async (response) => {
                if (response) {
                    const token = await jwt.sign({ _id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                    return res.status(200).json({ message: "Successfully login!", status: 200, token: token });
                } else {
                    return res.status(200).json({ message: "Invalid user id or password!!" });
                }
            })
            .catch((error) => {
                console.error(error);
                return res.status(200).json({ message: "Somthing went wrong!" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Somthing went wrong!" });
    }
});

UserRoutes.get("/logout", (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ message: "You have been logged out!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

UserRoutes.post("/reset-password", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });
        if (null == user) {
            return res.status(200).json({ message: "No any account exists with provided email address!", status: 400 });
        }

        const token = await jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        const resetPasswordLink = `${process.env.APP_CLIENT_API}/password/update?token=${token}sss`;

        mail("no-reply@gmail.com", "denisshingala@gmail.com", "Reset password", "", { template: "reset-password/page", context: { resetPasswordLink } })
            .then((response) => {
                if (response) {
                    res.status(200).json({ message: "Reset password link has been sent on provided email!", status: 200 });
                } else {
                    res.status(200).json({ message: response, status: 500 });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: "Something went wrong!!", status: 500 });
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!", status: 500 });
    }
});

UserRoutes.post("/update-password", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (null == user) {
            return res.status(200).json({ message: "No any account exists with provided email address!", status: 400 });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        User.findOneAndUpdate({ email: email }, { $set: { password: hashPassword } })
            .then((user) => {
                res.status(200).json({ message: "User details!", user: user, status: 200 });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: "Something went wrong!", status: 500 });
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!", status: 500 });
    }
});

module.exports = UserRoutes;