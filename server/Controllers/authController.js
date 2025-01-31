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

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials!');

    }
    console.log("User Details From Database :-" ,user);
    if (user.password !== password) {
      
      return res.status(400).send('Invalid credentials!');

    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET_KEY   || "secretkey", 
      { expiresIn: '5m' } 
    );

    await user.save();
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,  
      email: user.email  
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in: ' + error.message);
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


export const logoutUser = (req, res) => {
  res.json({ message: 'User logged out successfully' });
};
