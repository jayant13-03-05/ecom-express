const mongoose =require('mongoose');
const studentSchema=mongoose.Schema({

    FName:String,
    lName:String,
    Email:String,
    Dob:String,
    Phone:String,
    Address:String,
    Fees:String,
    PaymentMode:String
});


const studentModel=mongoose.model('student',studentSchema);
module.exports=studentModel;