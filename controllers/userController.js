const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/auth');

// Controller function to create a new user
exports.createUser = async (req, res) => {
  const { nick, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user and save it
    const newUser = await new User({
      nick,
      email,
      password: hashedPassword
    }).save();

    res.status(201).json(newUser); // Return the created user
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
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