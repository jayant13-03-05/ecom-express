var express = require('express');
const productModel = require('../models/product');
var router = express.Router();


/* add model to list. */
router.post('/add', async(req, res) => {
    let obj=new Model(req.body);
    const insertedObj = await obj.save();
    return res.status(201).json(insertedObj);
  });

/* get all customer. /student/find */
router.get('/find', async(req, res) => {
  const list = await Model.find();
  return res.status(201).json(list);
});


/* get all customer. /student/find/12345 */
router.get('/find/:id', async(req, res) => {
  const list = await Model.findById(req.params.id);
  return res.status(201).json(list);
});

/* get all customer. /student/find/12345 */
router.delete('/remove/:id', async(req, res) => {
  const list = await Model.findByIdAndDelete(req.params.id);
  return res.status(201).json({msg:"data deleted sucessfully"});
});

/* add customer list. */
router.put('/update/:id', async(req, res) => {
  let obj=req.body;
  const insertobj = await Model.findOneAndUpdate({
    _id:req.params.id},obj,{new:true});
  return res.status(201).json(insertobj);
  
});





module.exports = router;
