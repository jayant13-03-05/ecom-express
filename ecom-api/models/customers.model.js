const mongoose =require('mongoose');
const customerSchema=mongoose.Schema({

    FName:String,
    lName:String,
    emailAddress:String,
    phonenumber:String,
    dob:String,
});


const customerModel=mongoose.model('customers',customerSchema);
module.exports=customerModel;