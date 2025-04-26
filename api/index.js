const express = require("express");
const cors = require("cors");
const axios = require("axios");
const utils = require('./utils');
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
dotenv.config();
const { authRoutes, patientRoutes, cronRoutes } = require("./routes");



const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const options = {
    definition: {
        openapi : '3.0.0',
        info: {
            title: "ASHA Sakhi API",
            version: "1.0.0"
        },
        servers: [{
           url: process.env.API_BASE_URL
        }],
    },
    apis: ["./index.js", "api/routes/auth.js", "api/routes/patient.js", "api/routes/batch-sync.js"]
}

const swaggerSpec = swaggerJsDoc(options);
// cronUtil.scheduleJobs();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);

app.use('/api/patient', patientRoutes);

app.use('/api/cron', cronRoutes);

utils.connection.sync().then(async () => {
    console.log("DB Synced");
    const response = await axios.post(process.env.API_BASE_URL + '/api/cron/setup-cron');

}).catch((err) => {
    console.error(err);
});



app.listen(8080, () => {
    console.log("Server running on port 8080");
})