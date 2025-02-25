//STEP: 8 CREATE CONTROLLER FOR AUTHORISATION

const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs'); //for hashing password
const jwt = require("jsonwebtoken") //for decrypting password

//1.create a function as it is a call back function we use req res
const registerController = async (req,res) => {
    //2. to handle success and error we use try catch block
    try {//4. first we await the usermodel
        const existingUser = await userModel.findOne({email:req.body.email})   //5. first find the user because we want to login one user with one email id
        //validation
        if(existingUser)
        {
            return res.status(200).send({       //200-ok response
                success:false,
                message:'User Already Exists',
            });
        }
        //5. hash password - with the help of await bcrypt
        const salt = await bcrypt.genSalt(10);    //tells no of rounds required more no of rounds more processing power will be required to decrypt the password
        //6. get the password from the user - with the help of await bcrypt we hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt); //get plain password from req.body
        //7. once the required password is hashed replace the normal password with the hashed password
        req.body.password = hashedPassword;
        //8. rest data is accessed i.e we have to save the accessed data
        const user = new userModel(req.body)    //9. request for new user is sent
        await user.save()       //10. user is saved
        return res.status(201).send({       //11. 201 something hase been created 
            success:true,
            message:'User Registered Successfully',
            user,
        });
        //3. catch block to handle error case
    } catch (error) {
        console.log(error);     //prints the error as it is
        res.status(500).send({  //500- internal server error
            success: false,
            message: 'Error in Register API',
            
        });
    }
};

//12. login call back for logging in
const loginController =async (req,res) => {
    try {
        //14. check if user exits or no using whether email is already present in the db
        const user = await userModel.findOne({email: req.body.email});
        //validation
        //15. if there is no user existing
        if(!user)
        {
            return res.status(404).send({       //200-error
                success:false,
                message:'Invalid Credentials',
            });
        }
        //16. if user is found compare the actual password given using registration and now given password
        const comparePassword = await bcrypt.compare(req.body.password,user.password);
        //17. if not same return giving invalid credentials message
        if(!comparePassword){
            return res.status(500).send({
                success: false,
                message:'Invalid Credentials'
            });
        }
        //check role
        if(user.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message: "Role doesn't match",
            });
        }
        //18. if the user gives correct credentials then it generates the token with the help of sign function, the token is created on the basis of userid by creating a key of the user's id and so get it encrypted
        //encrypting token
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn: '1d',});       //19. add the secret key and token will be valid for 1day after that you have to login again
        return res.status(200).send({   //200- success response
            success: true,
            message:'Login Successful',
            token,
            user,
        });
        //13. error block
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error,
        });
    }
};

//19.create middlewares
//20. GET Current User
const currentUserController = async (req, res) => {
    //22. checking success scenario
    try {
        //23. find the ser based on user id that we added in the token
      const user = await userModel.findOne({ _id: req.body.userId });
      return res.status(200).send({
        success: true,
        message: "User Fetched Successfully",
        user,
      });
      //21. error block
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Unable to get Current User",
        error
      });
    }
  };
  //with the help of this current user we can create public and private route in front end

//2. export the functions registercontroller, login controller, currentuser controller
module.exports = { registerController, loginController, currentUserController};