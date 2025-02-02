const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({error : err.message});
}

module.exports = errorHandler;