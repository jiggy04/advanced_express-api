require('dotenv').config()

const express = require('express')
const cors = require('cors')
const ConnectDB = require('./database/connectDB')
const Article = require('./models/article.model')
const logRequest = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const ArticleRoute = require('./routes/article.route')

const app = express();
const PORT =  process.env.PORT || 3000


ConnectDB()


app.use(express.json())
app.use(cors('*'))

app.use(logRequest);

app.use('/api', ArticleRoute)

app.use(errorHandler);











app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) 
})