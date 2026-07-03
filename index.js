// Main entry point of the application to start the server and connect to the database

require('dotenv').config();
const validateEnv = require ('./src/utils/validateEnv')
validateEnv();

const ConnectDB = require('./src/config/ConnectDB');
const app = require('./src/app');



const PORT = process.env.PORT

app.listen(PORT, async () => {
    await ConnectDB()
    console.log(`Server is running on port ${PORT}`) 
})