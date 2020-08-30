const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect( 'mongodb+srv://mean_user:8vSfO8bBSsNi7vLB@cluster0.iafee.mongodb.net/appInteractivasDataBase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('DB online!');
    } catch (error) {
        console.log(error);
        throw new Error('Error en conexión con base')
    }

}

module.exports = {
    dbConnection
}