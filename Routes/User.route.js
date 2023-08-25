const express = require("express");
const app = express();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { validateUserFields } = require("../middlewares/validator.middleware.js")
require("dotenv").config();
app.use(express.json());


app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const sixDigitOTP = Math.floor(Math.random() * 900000) + 100000;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not registered." });
        }

        sendOTP(user.email, sixDigitOTP);

        res.status(200).json({ message: "OTP sent to your email.", data: { otp: sixDigitOTP, email: user.email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.use(validateUserFields)
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            res.status(200).json({ message: "User already exists. Please login." });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(500).json({ error: "Hashing error." });
                } else {
                    const newUser = new UserModel({ ...req.body, password: hash });
                    await newUser.save();
                    res.status(201).json({ message: "User registered successfully.", user: newUser });
                }
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {

            bcrypt.compare(password, user.password, (err) => {

                if (err) {
                    res.status(401).json({ message: "Wrong credentials." });

                } else {
                    const token = jwt.sign(
                        { userId: user._id, userName: user.name },
                        process.env.secret_key,
                        { expiresIn: "7d" }
                    );
                    res.status(200).json({ message: "Login successful", accessToken: token, user: user });
                }
            })
        } else {
            res.status(404).json({ message: "User not registered." });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});







module.exports = app;


async function sendOTP(email, OTP) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.mail,
            pass: process.env.mailPass
        }
    });


    const mailOptions = {
        from: `"Service Provider" <${process.env.mail}>`,
        to: email,
        subject: "Password Reset - OTP",
        text: `${OTP} is your one time password`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}