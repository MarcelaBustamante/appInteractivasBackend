const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'ADMIN'
    },
})

// Esto permite no enviar datos del Schema en la response
// en este caso, enviamos todo menos el __v, el _id y la password.
UserSchema.method('toJSON', function() {
    const { __v, password, ...object} = this.toObject();
    return object;
});

module.exports = model('User', UserSchema);