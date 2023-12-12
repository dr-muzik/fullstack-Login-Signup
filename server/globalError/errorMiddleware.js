const devError = (err, res) => {
        res.status(err.statusCode).send({
            message: err.message,
            status: err.status,
            error: err,
            stack: err.stack
        })
}

const prodError = (err, res) => {
    if(isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        })
    }else {
        res.status(500).json({
            status: 'programming error',
            message: 'something went wrong'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

   if(NODE_ENV === 'development')
    {
        devError(err, res);
    }
    if(NODE_ENV === 'production')
        {

            let error = {...err}

            console.log("\n\n------ begin: ------");
            console.log("ERROR: ", error);
            console.log("------ end: ------\n\n");

            // if(error) {

            // }


            prodError(err, res);
        }

}