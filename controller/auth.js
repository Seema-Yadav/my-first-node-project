const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/user');
const { findById } = require('../models/user');
const { response } = require('express');

//@desc Registered user
//@route POST/api/v1/register
//@access public
exports.register = asyncHandler(async (req, res, next) => {


    const { name, email, password, role } = req.body;

    //create user
    const user = await User.create({
        name, email, password, role
    });

    //create token
    sendTokenResponse(user, 200, res);
});
//@desc LOGIN user
//@route POST/api/v1/login
//@access public
exports.login = asyncHandler(async (req, res, next) => {


    const { email, password } = req.body;

    //validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please enter email and password'));
    }

    //check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid creditial', 401));
    }

    //check if password match
    const isMatch = user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid creditial', 401));
    }
    //create token
    sendTokenResponse(user, 200, res);
});

//get token from model,create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true

    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};

exports.forgotPasssword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse('There isss no user with this emil', 401));
    }

    //get reet toen
    const resetToken = user.getResetPasswordToken();

    await user.save({ ValiditeBeforeSave: false });
    res.status(200).json({
        success: true,
        data: user
    });
});