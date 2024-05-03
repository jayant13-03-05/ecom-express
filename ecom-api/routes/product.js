var express = require('express');
const Model = require('../models/product');
const category = require('../models/category');
const { default: mongoose } = require('mongoose');
const product = require('../models/product');
var router = express.Router();


/* add model to list. */
router.post('/add', async (req, res) => {
  const data = await category.findById(req.body.category);
  if (!data) return res.status(400).send({ success: false, test: true })
  let obj = new Model(req.body);
  const insertedObj = await obj.save();
  return res.status(201).json(insertedObj);
});

/* get all customer. /student/find */
router.get('/find', async (req, res) => {
  const list = await Model.find();
  return res.status(201).json(list);
});

/* get all customer. /student/find */
router.get('/get/featured', async (req, res) => {
  const list = await Model.find({ isFeatured: false }).limit(1);
  if (!list) {
    res.status(500).json({ success: false })
  }
  return res.status(201).json(list);
});



/* get all customer. /student/find */
router.get('/find2', async (req, res) => {
  const list = await Model.find().populate('category');
  return res.status(201).json(list);
});

router.get('/find3', async (req, res) => {
  const list = await Model.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      }
    },
  ])
  return res.status(201).json(list);
});

/* get all customer. /student/find */
router.get('/find/name', async (req, res) => {
  const list = await Model.find().select('name brand -_id');
  return res.status(201).json(list);
});


/* get all customer. /student/find/12345 */
router.get('/find/:id', async (req, res) => {
  const list = await Model.findById(req.params.id).populate('category');
  return res.status(201).json(list);
});

/* get all customer. /student/find/12345 */
router.delete('/remove/:id', async (req, res) => {
  let obj = req.body;
  const list = await Model.findByIdAndDelete(req.params.id);
  return res.status(201).json({ msg: "data deleted sucessfully" });
});



/* add customer list. */
router.put('/update/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Product Id')
  }


  let obj = req.body;
  const insertobj = await Model.findOneAndUpdate({
    _id: req.params.id
  }, obj, { new: true });
  return res.status(201).json(insertobj);

});


module.exports = router;
