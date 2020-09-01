const { response } = require("express");
const User = require('../models/user.model.js');

const getUsers = async (req, res = response) => {
    const users = await User.find();
    res.json({
        ok: true,
        method: 'getUsers',
        users: users
    });
}

const createUser = async (req, res = response) => {
    const { email, password, name } = req.body;
    const user = new User(req.body);
    await user.save();
    res.json({
        ok: true,
        method: 'createUser',
        user: user
    });
}

module.exports = {
    getUsers,
    createUser
}