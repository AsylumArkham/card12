const User = require('../models/User');
const { makeToken } = require('../middleware/auth');

const create = async (req, res) => {
    try {
        const { email, password, role, empresa } = req.body;
        if (!user || !password || !empresa) throw new Error('Cant create user');
        const newUser = new User(email, password, role, empresa);
        newUser.password = await newUser.hash();
        await newUser.save();
        res.send({ user: newUser });
    } catch(err) {
        res.status(400).send({ Error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) throw new Error('User not found');
        if (!user.compare(password)) throw Error('Invalid password');
        res.send({ token: makeToken(user) });
    } catch(err) {
        res.status(400).send({ Error: err.message });
    }
};

const readAll = async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        if (!user.role == 'admin') throw new Error('Not allowed');
        const users = await User.find().select('-password');
        res.send({ users });
    } catch(err) {
        res.status(400).send({ Error: err.message });
    }
};

const readOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) throw new Error('User not found');
        res.send({ user });
    } catch(err) {
        res.status(400).send({ Error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const { email, password, newPassword, role, empresa } = req.body;
        const currentUser = await User.findById(req.currentUser);
        const userToUpdate = await User.findById(req.params.id);
        if (!currentUser) throw new Error('Not authenticated');

        const isAdmin = (currentUser.role == 'admin');
        const changePassword = (password && newPassword);
        const sameUser = (currentUser._id == req.params.id);

        const updates = {};
        if (email) updates.email = email;
        if (role) updates.role = role;
        if (empresa) updates.empresa = empresa;

        if (isAdmin && sameUser) 


        if (currentUser.role == 'admin') {

            if (user._id == req.params.id) {
                
            } else {

            }

            


            if (password && newPassword) {

            }

        } else {
            // a normal user, only can change his password
            if (!password && !newPassword) throw new Error('Not allowed to update user data');
            const isOk = user.compare(password);
            if (!isOk) throw new Error('You must provide the old password');
            const passwordHashed = await user.hash(newPassword);
            await User.findOneAndUpdate({ _id: req.currentUser }, { password: passwordHashed });
            res.send({ message: 'Password changed' });
        }
    } catch(err) {
        res.status(400).send({ Error: err.message });
    }
};

const deleteOne = async (req, res) => {
    try {
        res.send({ users });
    } catch(err) {
        res.status(400).send({ Error: err.message });
    }
};

module.exports = { readAll, readOne, create, login, update, deleteOne };