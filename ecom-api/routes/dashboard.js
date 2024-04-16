var express = require('express');
const dashboardModel = require('../models/dashboard.model');
var router = express.Router();

/* GET users listing. */
router.post('/add', async(req, res) => {
  let dashboardobj=new dashboardModel({
    LoanId:"LN-1454",
    CustomerName:"Thebird",
    LoanType:"@twitter",
    LastPayment:"italy",
    PaymentDue:"rome",
    LoanStatus:"Risk",
  });
  const insertdashboardobj = await dashboardobj.save();
  return res.status(201).json(insertdashboardobj);
});
module.exports=router;


/* GET all details. */
router.get('/Find', async(req, res) => {
    const dashboardlist = await dashboardModel.find();
    return res.status(201).json(dashboardlist);
  });
  module.exports=router;