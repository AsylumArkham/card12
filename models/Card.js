const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    pregunta: {
        type: String,
        require: true,
        unique: true
    },
    respuesta: String,
    tema: [ String ],
    user: { 
        type: mongoose.Types.ObjectId,
        refs: 'User'
    }
});

module.exports = mongoose.model('Card', cardSchema);