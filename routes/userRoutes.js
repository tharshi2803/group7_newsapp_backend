const express = require('express');
const router = express.Router();
const {
    loginUser,
    registerUser,
    getUsers,
    getUserById,
    updateUser
} = require('../controllers/userController');

//get all user
router.get('/', getUsers);

//get a user
router.get('/:id', getUserById);

//register a user
router.post('/register', registerUser);

//login a user
router.post('/login', loginUser);

//update a user
router.put('/:id', updateUser);

module.exports = router;
