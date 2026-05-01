import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already in use!');
    }

    const user = new User({
      username,
      email,
      password,
    });
  
    await user.save();
    res.status(200).send('User registered successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user: ' + error.message);
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // ✅ Temporarily log to debug
  console.log("Login attempt:", email, password);
  console.log("Admin email from env:", process.env.ADMIN_EMAIL);
  console.log("Admin password from env:", process.env.ADMIN_PASSWORD);
  try {
    // ✅ Check admin credentials first
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        message: "Login successful",
        token,
        role: "admin",
      });
    }

    // Normal user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Compare plain password (since you're not using bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: "user" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: "user",
      userId: user._id,
      email: user.email,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in: " + error.message });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const { email } = req.params;  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

 
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};
