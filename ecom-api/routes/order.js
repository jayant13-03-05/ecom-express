var express = require('express');
const Model = require('../models/order');
const model = require('../models/order-item')
var router = express.Router();

/* add model to list. */
router.post('/add', async(req, res) => {
  const orderItemIds= Promise.all(req.body.OrderItem.map(async orderItem =>{
    let newOrderItem = new model({
      quantity:orderItem.quantity,
      product:orderItem.product
    })
    newOrderItem = await newOrderItem.save();
    return newOrderItem._id;
  }))
   const OrderItemIds2 = await orderItemIds;
   console.log(orderItemIds);

  let obj=new Model ({
    OrderItem:OrderItemIds2,
    shippingAddress1:req.body.shippingAddress1,
    shippingAddress2:req.body.shippingAddress2,
    city:req.body.city,
    zip:req.body.zip,
    country:req.body.country,
    phone:req.body.phone,
    status:req.body.status,
    totalPrice:req.body.totalPrice,
    user:req.body.user,
  })
  const insertedObj = await obj.save();
  console.log(insertedObj);
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

/* get all category. /student/find/12345 */
router.delete('/remove/:id', async(req, res) => {
  const list = await Model.findByIdAndDelete(req.params.id);
  return res.status(201).json({msg:"data deleted sucessfully"});
});

/* add category list. */
router.put('/update/:id', async(req, res) => {
  let obj=req.body;
  const insertobj = await Model.findOneAndUpdate({
    _id:req.params.id},obj,{new:true});
  return res.status(201).json(insertobj);
  
});





module.exports = router;
