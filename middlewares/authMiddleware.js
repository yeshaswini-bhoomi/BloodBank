//STEP: 9 FOR AUTHENTICATION CREATE MIDDLEWARES TO PROTECT THE UPCOMING ROUTES

// to protect next routes we  create middlewares as this is related to authentication it is called authmiddleware
//next function is called middleware i.e. until this is executed the next things are not executed

//1.import token
//in login we have encrypted now we are decrypting
const JWT = require("jsonwebtoken"); //verify the token
module.exports = async (req, res, next) => {   //only when next is called the function is executed
    try {
      //3. token is checked and it is present in headers
        const token = req.headers["authorization"].split(" ")[1]; //follow the naming convention when giving the token
        //4. verify function whatever token is there in the headers that is passed and for decrypting it whatever secret key is there in the .env file is used
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
          //5. first check error case
            if (err) {
                return res.status(401).send({
                  success: false,
                    message:'Authentication Failed',
                });
            } else {
              //6. decoded value
                req.body.userId = decode.userId;
                next();// call next function
              }
            });
            //2. error block
    } catch (error) {
        console.log(error);
        return res.status(401).send({  //401- unauthorized access
          success: false,
          error,
            message:'Authentication Failed'
        });
    }
//this is the authentication middleware function so we can protect our route until the route gets the token and gets successfully verified the code will not get executed and so we receive an error
};
