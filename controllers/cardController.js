const Card = require('../models/Card');

const create = async (req, res) => {
    try {
        
        res.send({ cards });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const readAll = async (req, res) => {
    try {
        res.send({ cards });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const readOne = async (req, res) => {
    try {
        res.send({ cards });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const update = async (req, res) => {
    try {
        res.send({ cards });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const deleteAll = async (req, res) => {
    try {
        res.send({ cards });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};

const deleteOne = async (req, res) => {
    try {
        res.send({ cards });
    } catch (err) {
        res.status(400).send({ Error: err.message });
    };
};


module.exports = { create, readAll, readOne, update, deleteAll, deleteOne };