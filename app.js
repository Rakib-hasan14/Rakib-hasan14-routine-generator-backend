require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || '5001';
const server = require('http').createServer(app);
const mongoose = require('mongoose');


app.use(express.json())



app.use(
    cors()
);

app.use('/', require('./src/modules/routes/index'));

(async () => {
    await mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Connected to Mongodb');
            }
        })
        .catch(err => {
            console.error('App starting error:', err.message);
            // process.exit(1);
        })
})();


server.listen(port, () => {
    console.log('Server started on: ', `http://localhost:${port}`);
});

module.exports = server;