// Main application file to set up the Express server, middleware, and routes

const express = require('express')
const cors = require('cors')
const Article = require('./models/article.model')
const logRequest = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const ArticleRoute = require('./routes/article.route')
const UserRoutes = require('./routes/user.route')

const app = express();


app.use(express.json())
app.use(cors('*'))

app.use(logRequest);

app.use('/api', ArticleRoute)
app.use('/api/users', UserRoutes)

app.use(errorHandler);


module.exports = app;








