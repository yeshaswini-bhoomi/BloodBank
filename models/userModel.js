//STEP: 6 CREATE USER MODEL TO SAVE USER DETAILS

//1. import mongoose because with the help of mongoose we can create a schema nosql database -mongodb so with the help of this the documents inside the collection are created with mongoose
const mongoose = require('mongoose')

//2. create a schema and in the function the objects are called documents
const userSchema = new mongoose.Schema({
    //7. role is also to be added whether it is a user, org, hospital, admin
    role:{
        type:String,
        required:[true,'Role is required'],
        enum:['admin', 'organisation', 'donor', 'hospital'] //enum can add values inside the array
    },
    //8. name field conditionally - only if the role is user or admin
    name:{
        type:String,
        required:function(){    //function is indicated conditionally when the name field is required
            if(this.role === 'user' || this.role === 'admin'){
                return true;
            }
            return false; // if the role is not user or admin then there is no name field
        }
    },
    //9. organisation field only if role is org
    organisationName:{
        type:String,
        required:function(){    //function is indicated conditionally when the name field is required
            if(this.role === 'organisation'){
                return true;
            }
            return false;
        }
    },
    //10. only if role is hospital
    hospitalName:{
        type:String,
        required:function(){    //function is indicated conditionally when the name field is required
            if(this.role === 'hospital'){
                return true;
            }
            return false;
        }
    },
    //3. email is of string type and the user has to provide it compulsary this is shown by required attribute
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,              //with one email id only one user can register
    },
    //4. password field is also added
    password:{        //encrypt the password so that no one can access in case of data breach the hash password cannot be decrypted without the original password so the application's security will be reserved
        type:String,
        required:[true,'Password is required'],    //min length validation can be applied
    },
    website:{
        type:String,//5. as required is not present it depends on the user whether he wants to enter it or no
    },
    //6. address is optional can be edited later on
    address:{
        type:String,
        required:[true,'Address is required'],
    },
    //7. phone number is optional
    phone:{
        type:String,
        required:[true,'Phone number is required'],
    },
}, //11. when a new user is created its time stamp gets added
{timestamps:true});

//export
module.exports=mongoose.model("users", userSchema);

//this is stored in the mongodb for every user that enters his details
//with the help of this we can create route functions and controller functions