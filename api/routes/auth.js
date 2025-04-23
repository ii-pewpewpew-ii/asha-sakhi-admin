const express = require("express");
const { authHandlers } = require("../handlers");

const router = express.Router();

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Login Endpoint
 *      description: Authenticates user credentials and returns a JWT
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Successfully logged in
 *              headers:
 *                  x-access-header:
 *                      description: JWT token for authentication
 *                      schema:
 *                          type: string
 */


router.post("/login", authHandlers.loginHandler);

/**
 * @swagger
 * /signup:
 *  post:
 *      summary: Signup Endpoint
 *      description: Creates a new user with username, password, and profile details
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          profile:
 *                              type: object
 *                              properties:
 *                                  firstName:
 *                                      type: string
 *                                  lastName:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *      responses:
 *          201:
 *              description: User created successfully
 */

router.post("/signup", authHandlers.signupHandler);

module.exports = router;