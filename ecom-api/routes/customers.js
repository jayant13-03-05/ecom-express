var express = require('express');
const customerModel = require('../models/customers.model');
var router = express.Router();

/* add customer list. */
router.post('/add', async(req, res) => {
  let customerobj=new customerModel(req.body);
  const insertcustomersobj = await customerobj.save();
  return res.status(201).json(insertcustomersobj);
});

/* get all customer. /customer/find */
router.get('/find', async(req, res) => {
  const customerlist = await customerModel.find();
  return res.status(201).json(customerlist);
});




module.exports = router;
