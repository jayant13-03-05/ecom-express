var express = require('express');
const Model = require('../models/order');
const model = require('../models/order-item');
const { populate } = require('../models/user');
var router = express.Router();

/* add model to list. */
router.post('/add', async (req, res) => {
  const orderItemIds = Promise.all(req.body.orderItem.map(async orderItem => {
    let newOrderItem = new model({
      quantity: orderItem.quantity,
      product: orderItem.product
    })
    newOrderItem = await newOrderItem.save();
    return newOrderItem._id;
  }))
  const OrderItemIds2 = await orderItemIds;
  console.log(orderItemIds);

  let obj = new Model({
    OrderItem: OrderItemIds2,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  })
  const insertedObj = await obj.save();
  console.log(insertedObj);
  return res.status(201).json(insertedObj);
});

/* get all customer. /student/find */
router.get('/find', async (req, res) => {
  const list = await Model.find().populate('user', 'name')
    .populate({
      path: 'OrderItem', populate: {
        path: 'product',  populate: {
          path: 'category', select: 'name'
        }
      }
    });
  return res.status(201).json(list);
});

/* get all customer. /student/find */
router.get('/userorder/:id', async (req, res) => {
  const list = await Model.find({user:req.params.id})
  .populate({
    path: 'OrderItem', populate: {
      path: 'product',  populate: {
        path: 'category', select: 'name'
      }
    }
  }).sort('description');
  return res.status(201).json(list);
});



/* get all customer. /student/find/12345 */
router.get('/count', async (req, res) => {
  const list = await Model.countDocuments()
  if(!list){
    return res.status(201).json({success:false})
  }
  return res.status(201).json(list);
});

/* get all customer. /student/find/12345 */
router.get('/totalsales', async (req, res) => {
  const list = await Model.aggregate([
    {$group:{_id:null , totalsales:{$sum:'$totalPrice'}}}
  ])
  if(!list){
    return res.status(201).json({success:true})
  }
  return res.status(201).json(list);
});


/* get all customer. /student/find/12345 */
router.get('/find/:id', async (req, res) => {
  const list = await Model.findById(req.params.id).populate('user', 'name');
  return res.status(201).json(list);
});

/* get all category. /student/find/12345 */
router.delete('/remove/:id', async (req, res) => {
  Model.findByIdAndDelete(req.params.id)
  .then(async order =>{
    if(order){
      await order.OrderItem.map(async orderItem =>{
        await model.findByIdAndDelete(orderItem)
        console.log(orderItem);
      })
    }
  });
  return res.status(201).json({ msg: "data deleted sucessfully" });
});

/* add category list. */
router.put('/update/:id', async (req, res) => {
  let obj = req.body;
  const insertobj = await Model.findOneAndUpdate({
    _id: req.params.id
  }, obj, { new: true });
  return res.status(201).json(insertobj);

});





module.exports = router;
