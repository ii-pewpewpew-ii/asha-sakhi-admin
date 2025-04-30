const express = require("express");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }).single("documents");
const {patientHandler} = require("../handlers")
const router = express.Router();


/**
 * @swagger
 * /patient-list:
 *  get:
 *      summary: Fetch all patients
 *      description: Returns a list of all registered patients
 *      responses:
 *          200:
 *              description: A list of patients
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: string
 *                                  name:
 *                                      type: string
 *                                  age:
 *                                      type: integer
 *                                  gender:
 *                                      type: string
 */

router.get("/patient-list",upload, patientHandler.fetchAllPatients);


/**
 * @swagger
 * /save-patient:
 *  post:
 *      summary: Save patient
 *      description: Saves a new patient or updates an existing one using the provided details
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          mobileNumber:
 *                              type: string
 *                          patientId:
 *                              type: integer
 *                              description: Required for updates
 *                          state:
 *                              type: string
 *                          city:
 *                              type: string
 *                          languagePreference:
 *                              type: string
 *                          DoB:
 *                              type: string
 *                              format: date
 *                          deliveryDate:
 *                              type: string
 *                              format: date
 *      responses:
 *          200:
 *              description: Patient saved successfully
 *          400:
 *              description: Invalid input
 */
router.post("/save-patient", patientHandler.savePatient);


router.post("/save-checkup",upload, patientHandler.checkupHandler);
// router.post("/save-checkup", (req, res)=>{
//     console.log(req);
//     return res.status(200);
// });

module.exports = router;