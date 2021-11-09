const cors = require('cors');
const express = require('express');
require('dotenv/config');
const app = express();
const auth = require('./app/routes/auth.route');

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
}

app.use(cors(corsOptions));

app.use(express.json());


require('./app/models/index');

app.use('/api/auth', auth);


app.listen(5500, () => {
    console.log("Listening on 5500")
});