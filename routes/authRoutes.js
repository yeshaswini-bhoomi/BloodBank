//STEP:7 ROUTES CREATED FOR AUTHENTICATION

//1. import express
const express = require('express')
const { registerController, loginController,currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

//2. create router object
const router = express.Router()

//4. routes
//1. create route for REGISTER method used:POST
router.post('/register', registerController);

//2. create route for LOGIN method used:POST
router.post('/login', loginController);

//3. GET Current user || GET
router.get("/current-user", authMiddleware, currentUserController);

//3. export routes
module.exports = router;