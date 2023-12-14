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

const handleJWTErr = () => {
    const message = "You're not authenticated, please kindly login";
    return new CustomError(message, 401);
}

const handleLogin = () => {
    const message = "Invalid email or password";
    return new CustomError(message, 400);
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
    err.statusCode = err?.statusCode || 500;
    err.status = err?.status || 'error';
    err.message = err?.message || 'something went wrong';
    // console.log("from module.exports", err)

   if(process.env.NODE_ENV === 'development')
    {
        devError(err, res);
    }
    if(process.env.NODE_ENV === 'production')
        {

            const message = err.message; // to display the message in the response
            let error = {...err, message}

            // console.log("\n\n------ begin: ------");
            // console.log("ERROR: ", error);
            // console.log("------ end: ------\n\n");

            if(error.code === 'ER_DUP_ENTRY') {
                error = handleDuplicateEntry(error.sqlMessage);
            }

            if(error.name === 'JsonWebTokenError' || "TokenExpiredError") {
                error = handleJWTErr();
            }

            if(error.name === 'email' || "password") {
                error = handleLogin();
            }


            prodError(error, res);
        }

}