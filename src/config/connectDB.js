const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log('Connected to MongoDB')

    } catch (error) {
        console.error('DB connection failed', error);
        process.exit(1)
    }

}

module.exports = ConnectDB; 