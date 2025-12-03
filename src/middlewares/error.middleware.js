const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    const contains = err.message.includes('not found')
    const conflict = err.message.includes('duplicate') || err.message.includes('exists');;
    if(err.message && contains) {
       return  res.status(404).json({
            status: 'Not found',
            code: 404,
            message: err.message,
            path: req.path});
    }
    if(err.message && conflict) {
        return res.status(409).json({
            status: 'Conflict',
            code: 409,
            message: err.message,
        })
    }

    return res.status(500).json({
        status: 'Internet server error',
        code: 500,
        message: err.message,
        path: req.path});
}

export default errorHandler;