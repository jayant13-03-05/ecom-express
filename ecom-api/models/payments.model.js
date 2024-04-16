const mongoose=require('mongoose');
const paymentsSchema=mongoose.Schema({
    PaymentId:String,
    CustomerId:String,
    CustomerName:String,
    Amount:String,
    Tax:String,
    Mode:String,
    Date:String,
    Notes:String,
});

const paymentsModel=mongoose.model('payments',paymentsSchema);
module.exports=paymentsModel;