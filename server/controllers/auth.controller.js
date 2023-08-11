const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const { User } = require("../models");
const { Console } = require("console");

exports.register = async (req, res) => {
  try {
    const { username, password, email, fullName, photo } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      fullName,
      photo,
    });

    // Send verification email
    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY, // Replace with a secure verification secret
      { expiresIn: "1h" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with your email service (e.g., Gmail)

      auth: {
        user: process.env.SECRET_EMAIL_USER, // Replace with your email
        pass: process.env.SECRET_EMAIL_KEY, // Replace with your email password
      },
    });

    const verificationLink = `http://localhost:8080/auth/verify/${token}`; // Replace with your app's URL
    const mailOptions = {
      from: "abc@gmail.com", // Replace with your email
      to: email,
      subject: "Verify Your Email",
      text: `Click the following link to verify your email: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log("Email sent:", info.response);
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userProfile = {
      email: user.email,
      fullName: user.fullName,
      photo: user.photo,
    };

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user }); // Ensure the token is included in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findOne({ where: { username, email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY, // Replace with your reset password secret
      { expiresIn: "1h" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with your email service (e.g., Gmail)
      auth: {
        user: "sonyfebrian362@gmail.com", // Replace with your email
        pass: "axdlibaiqsectvbt", // Replace with your email password
      },
    });

    const resetLink = `http://localhost:8080/auth/reset-password/${resetToken}`; // Replace with your app's URL
    const mailOptions = {
      from: "your-email@example.com", // Replace with your email
      to: email,
      subject: "Reset Your Password",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log("Email sent:", info.response);
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Replace with your reset password secret
    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Replace with your verification secret
    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ verified: true });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
