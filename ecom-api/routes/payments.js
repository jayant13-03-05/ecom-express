var express = require('express');
const paymentsModel = require('../models/payments.model');
var router = express.Router();

/* GET users listing. */
router.post('/add', async(req, res) => {
  let paymentsobj=new paymentsModel({
    PaymentId:"LA-565456",
    CustomerId:"6645",
    CustomerName:"nitinkumar",
    Amount:"56563",
    Tax:"7.14",
    Mode:"debitcard",
    Date:"11-1-2016",
    Notes:"paymnetnotes",
  });
  const insertpaymentsobj = await paymentsobj.save();
  return res.status(201).json(insertpaymentsobj);
});
module.exports=router;

/* GET all details. */
router.get('/Find', async(req, res) => {
  const paymentslist = await paymentsModel.find();
  return res.status(201).json(paymentslist);
});
module.exports=router;