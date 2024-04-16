var express = require('express');
const customerModel = require('../models/customers.model');
var router = express.Router();

/* GET users listing. */
router.post('/add', async(req, res) => {
  let customerobj=new customerModel({
    FName:"john",
    lName:"abhram",
    emailAddress:"sharmaankit23@gmail.com",
    phonenumber:"8976543456",
    dob:"15-10-2004",
  });
  const insertcustomersobj = await customerobj.save();
  return res.status(201).json(insertcustomersobj);
});


module.exports = router;
