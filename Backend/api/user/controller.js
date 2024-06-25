const User = require("./model");
const Jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { jwtkey } = require("../../keys");

const registerUser = async (req, res) => {
  try {
    // Extract user information from request body
    const { name, email, password, pic } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    let user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      // Assuming pic is a URL string provided in the request body
      // If not, modify accordingly
      Photo: pic ? pic : null,
    });

    // Save the user to the database
    let result = await user.save();

    // Send verification email
    sendVerificationEmail(user.email, user.name, result._id);

    // Remove password from result object before sending response
    result = result.toObject();
    delete result.password;

    // Send response with user data
    res
      .status(201)
      .json({ user: result, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    // let user = await User.findOne({ email }).select("-password");
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Passwords match, generate token and send response
    Jwt.sign({ user: user }, jwtkey, { expiresIn: "8h" }, (err, token) => {
      if (err) {
        res.status(500).send(err); // Handle error while generating token
      } else {
        res.send({ user: user, token: token });
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendVerificationEmail = async (email, name, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "darshitkakadiya1@gmail.com",
        pass: "agww uqjk lczb xtfc", // Fill in your email password here
      },
    });
    const mailOptions = {
      from: "darshitkakadiya1@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Hello ${name},</p>
             <p>Please click on the following link to verify your email:</p>
             <a href="http://localhost:3000/verify?id=${id}">Verify Email</a>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    // You may want to handle the error appropriately
  }
};

const verifyMail = async (req, res) => {
  try {
    // Extract the user ID from the query parameters
    const userId = req.query.id;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's emailVerified field to true
    user.emailVerified = true;

    // Save the updated user object
    await user.save();

    // You can also redirect the user to a success page or send a success message
    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("name email Photo");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    let { name, email, Photo } = req.body;

    // Find the user by ID and update the specified fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, Photo },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  // Validate input
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  verifyMail,
  changePassword,
};
