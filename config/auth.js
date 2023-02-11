require('dotenv').config();
const jwt = require('jsonwebtoken');

const signInToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
};

const isAuth = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.header = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                success: false,
                message: 'Session Expired'
            })
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        })
    }
};

module.exports = {
    signInToken,
    isAuth,
};
