const express = require("express");
const cors = require("cors");

const utils = require('./utils');
const bodyParser = require("body-parser");
const { authRoutes } = require("./routes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

utils.connection.sync().then(() => {
    console.log("DB Synced");
}).catch((err) => {
    console.error(err);
});

app.use('/api/auth', authRoutes);

app.listen(8080, () => {
    console.log("Server running on port 8080");
})