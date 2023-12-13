const CustomError = require("../utils/customError");

const handleDuplicateEntry = (state) => {
    const error = state;
    const startIndex = error.indexOf("'");
    // console.log(startIndex)
    const endIndex = error.indexOf("'", startIndex + 1);
    // console.log(endIndex)
    const username = error.slice(startIndex + 1, endIndex);
    // console.log(username)
    const message = `the username '${username}' already exists`;
    return new CustomError(message, 409);
}

const devError = (err, res) => {
        res.status(err.statusCode).send({
            message: err.message,
            status: err.status,
            error: err,
            stack: err.stack
        })
}

const prodError = (err, res) => {
    if(err.isOperational) {
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

   if(process.env.NODE_ENV === 'development')
    {
        devError(err, res);
    }
    if(process.env.NODE_ENV === 'production')
        {
            // console.log("err", err)
            let error = {...err}

            // console.log("\n\n------ begin: ------");
            // console.log("ERROR: ", error);
            // console.log("------ end: ------\n\n");

            if(error.code === 'ER_DUP_ENTRY') {
                error = handleDuplicateEntry(error.sqlMessage);
            }


            prodError(error, res);
        }

}