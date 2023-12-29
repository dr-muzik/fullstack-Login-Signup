const server = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`);
    console.log(process.env.NODE_ENV);
});
