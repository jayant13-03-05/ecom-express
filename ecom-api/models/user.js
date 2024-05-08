const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    passwordHash:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    isADmin:{
        type:string,
        default:false,
    },
    street:{
        type:string,
        default:''
    },
    apartment:{
        type:string,
        default:''
    },
    zip:{
        type:string,
        default:''
    },
   city:{
    type:string,
    default:''
   } ,
   country:{
    type:string,
    default:''
   }

});

exports.User =moongoose.model('User',userSchema);
exports.userSchema =userSchema;