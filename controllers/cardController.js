const Card = require('../models/Card');
const User = require('../models/User');

const create = async (req, res) => {
    try {
        const { pregunta, respuesta, tema } = req.body;
        const card = await new Card({ pregunta, respuesta, tema, user: req.currentUser }).save();
        res.send({ card });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const readAll = async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        if (!user) throw new Error('Must authenticate')
        const filter = (user.role == 'admin') ? {} : { user: req.currentUser }
        const cards = await Card.find(filter);
        res.send({ cards });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const readOne = async (req, res) => {
    try {
        const card = Card.findById(req.params.id);
        if (!card) throw new Error('Card not found');
        res.send({ card });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const update = async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        if (!user) throw new Error('Must authenticate');
        const card = await Card.findById(req.params.id);
        if (!card) throw new Error('Card not found');
        const { pregunta, respuesta, tema } = req.body;
        const updates = {};
        if (pregunta) updates.pregunta = pregunta;
        if (respuesta) updates.respuesta = respuesta;
        if (tema) updates.tema = tema;
        if (Object.keys(updates).length==0) throw new Error('No data to update');
        const newCard = await Card.findOneAndUpdate({_id: req.params.id}, updates);
        res.send({ card: newCard });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const deleteAll = async (req, res) => {
    try {
        const cards = await Card.deleteMany({user: req.currentUser});
        if (!cards) throw new Error('Cards not found');
        res.send({ message: `${cards.deletedCount} cards deleted` });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const deleteOne = async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        if (!user) throw new Error('Must authenticate');
        const card = await Card.findById(req.params.id);
        if (card.user !== user._id && user.role !== 'admin') throw new Error('Not allowed to delete this card');
        const result = await Card.findOneAndDelete({_id: req.params.id});
        res.send({ message: `${result.deletedCount} card deleted` });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

module.exports = { create, readAll, readOne, update, deleteAll, deleteOne };