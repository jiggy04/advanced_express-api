// Error handling middleware to catch and handle errors in the application

const errorhandler = (err, req, res, next) =>{
    console.error(err.message);
    console.error(err.stack);
    const status = err.status || 500
    res.status(status).json({error: err.message})


}

module.exports = errorhandler