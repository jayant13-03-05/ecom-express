var express = require('express');
const Model = require('../models/user');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





/* add model to list. */
router.post('/add', async (req, res) => {
  let obj = new Model(
    {
      "name": req.body.name,
      "email": req.body.email,
      "passwordHash": bcrypt.hashSync(req.body.passwordHash, 10),
      "phone": req.body.phone
    }
  );
  const insertedObj = await obj.save();
  return res.status(201).json(insertedObj);
});


/* add model to list. */
router.post('/add', async (req, res) => {
  let obj = new Model(req.body);
  const insertedObj = await obj.save();
  return res.status(201).json(insertedObj);
});

/* get all user. /user/find */
router.get('/find', async (req, res) => {
  const list = await Model.find()
  return res.status(201).json(list);
});

router.get('/login', async (req, res) => {
  const list = await Model.findOne({ email: req.body.email })
  if (!list) return res.status(201).json({ Message: "User Not Found" })
  if (list && bcrypt.compareSync(req.body.passwordHash, list.passwordHash)) {
    const token = jwt.sign(
      {
        userId: list._id
      },
      'secret',
    
      {expiresIn:'3d'}
    )
    res.status(201).send({ list: list.email, token: token })
    res.status(201).send('Valid user')
  }
  else
    res.status(201).send('Invalid Password')

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

router.get('/learn', async (req, res) => {
  let filter = {};
  if (req.query.category) {
    filter = { category: req.query.category.split(',') }

  }
  return res.status(201).json(filter);
})

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
  const list = await Model.find();
  return res.status(201).json(list);
});


/* get all customer. /student/find/12345 */
router.get('/find/:id', async (req, res) => {
  const list = await Model.findById(req.params.id);
  if (!list) return res.status(201).json({ Message: "Data Not Found" })
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
