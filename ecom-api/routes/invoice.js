var express = require('express');
const invoiceModel = require('../models/invoice.model');
var router = express.Router();

/* GET users listing. */
router.post('/add', async(req, res) => {
  let invoiceobj=new invoiceModel(req.body);
  const insertinvoicesobj = await invoiceobj.save();
  return res.status(201).json(insertinvoicesobj);
});


/* GET all invoice list. */
router.get('/find', async(req, res) => {
    const invoicelist = await invoiceModel.find();
    return res.status(201).json(invoicelist);
  });

  /* GET all invoice list. */
router.get('/find/:id', async(req, res) => {
  const invoicelist = await invoiceModel.findById(req.params.id);
  return res.status(201).json(invoicelist);
});


module.exports = router;
