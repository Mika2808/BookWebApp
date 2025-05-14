const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken, isAdmin, isSelfOrAdmin } = require('../middlewares/auth');

const router = express.Router();

// Define the route for creating a user
router.post('/register', userController.createUser);

// Define the route for user login
router.post('/login', userController.login);

// Define the route for getting all users
router.get('/', 
    verifyToken, 
    isAdmin, 
    userController.getUsers);

// Define the route for deleting a users
router.delete('/:id', 
    verifyToken, 
    isSelfOrAdmin, 
    userController.deleteUser);

// Define the route for updating a users data
router.put('/:id', verifyToken, isSelfOrAdmin, userController.updateUser);

module.exports = router;
