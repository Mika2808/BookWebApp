const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define the route for creating a user
router.post('/', userController.createUser);

// Define the route for getting all users
router.get('/', userController.getUsers);

// Define the route for deleting a users
router.delete('/:id', userController.deleteUser);

module.exports = router;
