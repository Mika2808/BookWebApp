const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/auth');

// User validation function
const validateUserInput = async (nick, email) => {
  const existingUserByEmail = await User.where('email', email).fetch({ require: false });
  if (existingUserByEmail) {
    throw new Error('Email is already taken');
  }

  const existingUserByNick = await User.where('nick', nick).fetch({ require: false });
  if (existingUserByNick) {
    throw new Error('Nick is already taken');
  }
};

// Email validation function
const validateEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  const { nick, email, password } = req.body;

  try {
    // Validate email format
    if (!validateEmailFormat(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Validate user input (check if the email and nick are unique)
    await validateUserInput(nick, email);

    // Hashing password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it
    const newUser = await new User({
      nick,
      email,
      password: hashedPassword
    }).save();

    res.status(201).json(newUser); // Return the created user
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Controller function to fetch all users (for testing)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.fetchAll(); // Fetch all users from DB
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Controller function to delete user by id
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const deletedUser = await User.where({ id: userId }).destroy();
      if (deletedUser) {
        res.status(204).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };

// Controller function to update user data by id
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // Get user ID from URL parameter
  const { nick, email, password } = req.body;

  try {
    const user = await User.query().where('id', id).first();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password if provided
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user details
    const updatedUser = await User.query().where('id', id).update({
      nick,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Function to login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.where({ email }).fetch({ require: false });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.get('password'));
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user.toJSON());
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};