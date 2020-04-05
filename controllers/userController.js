const User = require('../models/User');
const { makeToken } = require('../middleware/auth');

const create = async (req, res) => {
    try {
        const { email, password, role, empresa } = req.body;
        if (!email || !password || !empresa) throw new Error('Cant create user');
        const newUser = new User(email, password, role, empresa);
        newUser.password = await newUser.hash();
        await newUser.save();
        res.send({ user: newUser });
    } catch (err) {
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
    } catch (err) {
        res.status(400).send({ Error: err.message });
    }
};

const readAll = async (req, res) => {
    try {
        // const user = await User.findById(req.currentUser);

        // // if (!user) throw new Error('Not authenticated');
        // if (!user) res.send({ users: [] });
        // if (!user.role == 'admin') throw new Error('Not allowed');
        const users = await User.find().select('-password');
        res.send({ users });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    }
};

const readOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) throw new Error('User not found');
        res.send({ user });
    } catch (err) {
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
        let updatedOk = false;

        // change password
        if ((isAdmin || sameUser) && (password && newPassword)) {
            const isOk = userToUpdate.compare(password);
            if (!isOk && !isAdmin) throw new Error('You must provide the old password');
            const passwordHashed = await userToUpdate.hash(newPassword);
            await User.findOneAndUpdate({ _id: req.userToUpdate._id }, { password: passwordHashed });
            updatedOk = true;
        }

        // change other data
        if (isAdmin) {
            const updates = {};
            if (email) updates.email = email;
            if (role) updates.role = role;
            if (empresa) updates.empresa = empresa;
            if (Object.keys(updates).length > 0) {
                await User.findOneAndUpdate({ _id: req.params.id }, updates);
                updatedOk = true;
            }
        }

        // send results
        if (updatedOk) {
            res.send({ message: 'User updated' });
        } else {
            res.status(400).send({ message: 'Cant make changes' });
        }
    } catch (err) {
        res.status(400).send({ Error: err.message });
    }
};

const deleteOne = async (req, res) => {
    try {
        res.send({ users });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    }
};

module.exports = { readAll, readOne, create, login, update, deleteOne };