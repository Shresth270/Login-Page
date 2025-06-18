const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/LoginSignupTutorial').then(() => {
    console.log("connected to database")
})

    .catch(() => {
        console.log("failed")
    })


const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model(
    'LogInCollection', LogInSchema);

module.exports = collection;    