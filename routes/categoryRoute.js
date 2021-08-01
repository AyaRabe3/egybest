const Category = require("../models/category");
const express = require("express");
const mongoose = require("mongoose");
const { findByIdAndDelete } = require("../models/category");

require("express-async-errors");
const router = express.Router();


//---------------- category ------------------//
router.post("/addCat", async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({
    name
  });
  await newCategory.save();
  res.json({
    newCategory
  });
});


//------------------- get all -------------------//
router.get("/getCategories", async (req, res, next) => {
    // const category = await Category.find();
    // res.json(category);
    try{
      const category= await Category.find()
      res.json(category)
      }
     catch(err){
      statusCode=400
      next(err)
     }
  });


//------------------ get by id -----------------//
router.get("/:id",async(req,res,next)=>{
    const {id}=req.params
    const category= await Category.findById(id)
    res.json(category)
})


//---------------------------UpdateCat---------------------------//
router.patch(
    "/Edit/:id",
    async (req, res, next) => {
      id = req.params.id;
      const {
        name
      } = req.body;
      const newCategory = await Category.findByIdAndUpdate(
        id,
        {
          $set: {
          name
          }
        },
        {
          new: true,
          runValidators: true,
          omitUndefined: true
        }
      ).populate("category");
      res.status(200).json(newCategory);
    }
  );


//-------------------------- delete one ------------------------//  
 router.delete("/:id",async(req,res,next)=>{
     const {id} =req.params
     const categoryToDelete=await Category.findByIdAndDelete(id)
     res.json(categoryToDelete)

 })









module.exports = router;
