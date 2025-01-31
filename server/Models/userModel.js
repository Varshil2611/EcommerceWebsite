import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

const User = mongoose.model('User', userSchema);

export default User;
