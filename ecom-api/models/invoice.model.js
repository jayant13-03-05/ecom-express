const mongoose =require('mongoose');
const invoiceSchema=mongoose.Schema({
    PaymentId:String,
    CustomerId:String,
    CustomerName:String,
    Amount:String,
    Tax:String,
    Mode:String,
    Date:String,
    Notes:String,
});

const invoicemodel=mongoose.model('invoice',invoiceSchema);
module.exports=invoicemodel;