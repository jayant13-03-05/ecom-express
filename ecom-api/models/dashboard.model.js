const mongoose=require('mongoose');
const dashboardSchema=mongoose.Schema({
     LoanId:String,
     CustomerName:String,
     LoanType:String,
     LastPayment:String,
     PaymentDue:String,
     LoanStatus:String,
});

const dashboardModel=mongoose.model('dashboard',dashboardSchema);
module.exports=dashboardModel;