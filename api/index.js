const express = require("express");
const cors = require("cors");

const utils = require('./utils');
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { authRoutes, patientRoutes } = require("./routes");



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

const options = {
    definition: {
        openapi : '3.0.0',
        info: {
            title: "ASHA Sakhi API",
            version: "1.0.0"
        },
        servers: [{
           url: "http://localhost:8080/"
        }],
    },
    apis: ["./index.js", "api/routes/auth.js", "api/routes/patient.js", "api/routes/batch-sync.js"]
}

const swaggerSpec = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);

app.use('/api/patient', patientRoutes);

app.listen(8080, () => {
    console.log("Server running on port 8080");
})