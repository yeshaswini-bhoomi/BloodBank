//STEP:2 ROUTES FOR TEST ROUTES

//created for test
//1. import express
const express = require('express');
//4. file gets automatically imported
const { testController } = require('../controllers/testController');

//2. creating router object for storing routing functionalities in a variable
const router = express.Router();

//3. create routes using GET method and a callback function called controller function testcontroller created using mvc pattern
router.get("/", testController);

//5. export router so whatever routes will be created in future they will also get exported
// why only module is used for exporting? -es 5 version is used
module.exports = router;