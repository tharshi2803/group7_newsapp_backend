require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// const { signInToken } = require('../config/auth');

const registerUser = async (req, res) => {
    try {
        const isAdded = await User.findOne({ email: req.body.email });
        if (isAdded) {
            return res.status(403).send({
                message: 'This Email already Added!',
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: req.body.avatar,
                password: bcrypt.hashSync(req.body.password),
            });
            const user = await newUser.save();
    
            res.send({
    
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (
            user &&
            user.password &&
            bcrypt.compareSync(req.body.password, user.password)
        ) {
            
            res.send({
                
                _id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            });
        } else {
            res.status(401).send({
                message: 'Invalid user or password!',
            });
        }
    } catch (err) {
        res.status(500).send({
            message: 'Unauthorized user',
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ _id: -1 });
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(500).send({
            message: 'User not found!',
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.avatar = req.body.avatar;
            const updatedUser = await user.save();
            
            res.send({
                
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
            });
        }
    } catch (err) {
        res.status(404).send({
            message: 'Your email is not valid!',
        });
    }
};

module.exports = {
    loginUser,
    registerUser,
    getUsers,
    getUserById,
    updateUser
};