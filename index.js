const server = require('./server');
const { PORT } = require('./config');

server.listen(PORT, (err) => {
    if (err) return console.log('Error in server. ', err);
    console.log(`Server is running on port: ${[PORT]}`);
});