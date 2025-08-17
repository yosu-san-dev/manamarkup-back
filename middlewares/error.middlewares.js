const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {...err}

        error.massage = err.massage;

        console.log(err);

        // Mongoose bas ObjectId
        if(err.name === 'CastError'){
            const massage = 'Resource not found';
            error = new Error(massage);
            error.statusCode = 404;
        }

        // Mongoose dup key
        if(err.code === 11000){
            const massage = 'Duplicate field value entered';
            error = new Error(massage);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if(err.name === 'ValidationError'){
            const massage = Object.values(err.errors).map(val => val.massage);
            error = new Error(massage.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({ success: false, error: error.massage || 'Server Error!' });
    } catch(error){
        next(error);
    }
};

export default errorMiddleware;