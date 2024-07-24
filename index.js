const express = require('express');
const http = require('http');
const cors = require('cors');
const { Route } = require('./Routes/Route');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors()); // Enable CORS for all routes
app.options('*', cors());

app.use(express.json());

app.use('/', Route);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
