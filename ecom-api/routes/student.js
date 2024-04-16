var express = require('express');
const studentModel = require('../models/student.model');
var router = express.Router();

/* add customer list. */
router.post('/add', async(req, res) => {
  let studentobj=new studentModel(req.body);
  const insertstudentobj = await studentobj.save();
  return res.status(201).json(insertstudentobj);
});

/* get all customer. /student/find */
router.get('/find', async(req, res) => {
  const studentlist = await studentModel.find();
  return res.status(201).json(studentlist);
});


/* get all customer. /student/find/12345 */
router.get('/find/:id', async(req, res) => {
  const studentlist = await studentModel.findById(req.params.id);
  return res.status(201).json(studentlist);
});

/* get all customer. /student/find/12345 */
router.delete('/remove/:id', async(req, res) => {
  const studentlist = await studentModel.findByIdAndDelete(req.params.id);
  return res.status(201).json({msg:"data deleted sucessfully"});
});

/* add customer list. */
router.put('/update/:id', async(req, res) => {
  let studentobj=req.body;
  const insertstudentobj = await studentModel.findOneAndUpdate({
    _id:req.params.id},studentobj,{new:true});
  return res.status(201).json(insertstudentobj);
  
});





module.exports = router;
