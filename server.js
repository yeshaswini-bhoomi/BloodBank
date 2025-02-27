//STEP:1 CREATE SERVER

//1. import express
const express = require("express");
//6. import dotenv
const dotenv = require("dotenv");
//10. import other dependencies
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

//7. dot config
dotenv.config();

//8. to call for mongodb connection
connectDB();

//2. create rest object with the help of which we can create a server and store all the functionalities of express inside a variable named app
const app = express();

//11. middlewares - next function
app.use(express.json()); //2. app can access json responses also
app.use(cors()); //1. enables cors
app.use(morgan("dev")); //3. receive a message on the console that which url is active and what the response is and what time it took

//5. routes
//1 test route - use get method
//'/' indicates local host home route and then we use call back function which has request,response and middleware req is used to take request from the user and res to give some response from the user
//request - we take request from user response - json response can also send html response
//first we used get method now we are using use method it acts as middleware
app.use("/api/v1/test", require("./routes/testRoutes"));
//12. for authroute
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

//3. create port
//9. get the port number by process object
const PORT = process.env.PORT || 8080;

//4. create a method named listen to call to run our app
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
