module.exports = {
    DB: process.env.MONGODB_URI || 'mongodb://localhost:27017/card12',
    OPTIONS: {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    PORT: process.env.PORT || 3000,
    SECRET: 'eljuiciodederechosfundamentales',
    SALT: 10
};