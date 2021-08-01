const Series = require("../models/series");
const Category = require("../models/category");
const express = require("express");
const mongoose = require("mongoose");

require("express-async-errors");
const router = express.Router();


//----------------------- add Series ---------------------------------//
router.post("/addSeries", async (req, res) => {
    const { name, categoryId } = req.body;
    const newSeries = new Series({
      name,
      categoryId
    });
    await newSeries.save();
    res.json({
        newSeries
    });
  });
  

//---------------------- get all Series ----------------------------//
router.get("/getAllSeries", async (req, res, next) => {
  const series = await Series.find().populate("categoryId");
  let newSeries = series.map(e=> (
    e = {
      name: e.name,
      id: e.id,
      categoryId: e.categoryId._id,
      categoryName: e.categoryId.name
    }))
  res.json(newSeries);
});
//-----------------get Series by id ---------------------------//
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const series = await Series.findById(id)
    .populate("category")
  res.json(series);
});
//---------------------------UpdateSeries---------------------------//
router.patch(
  "/Edit/:id",
  async (req, res, next) => {
    id = req.params.id;
    console.log("id",id)
    const {
      name,
      categoryId,
         } = req.body;
     const series = await Series.findByIdAndUpdate(
      id,
      {
        $set: {
        name,
        categoryId
        }
      },
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      }
    )
    res.status(200).json(series);
  }
);

//--------------------------delete movie -------------------------//
router.delete("/:id",async(req,res,next)=>{
  const {id} =req.params
  const seriesToDelete=await Series.findByIdAndDelete(id)
  res.json(seriesToDelete)
})


////------------------ search by name and category ------------------///
router.post("/search/:name?",async(req,res,next)=>{
  const searchedFeilds=req.params.name 
  const {categoryId}=req.body

  if(searchedFeilds &&!categoryId){
    let result= await Series.find({ name: new RegExp(searchedFeilds, 'i')})
    res.send(result)

  }
  else if(!searchedFeilds && categoryId){
    let result= await Series.find({categoryId:categoryId})
    res.send(result)
  }

  else if (searchedFeilds && categoryId){
    let result= await Series.find({ name: new RegExp(searchedFeilds, 'i'),categoryId:categoryId})
    res.send(result)
  }
  })
  




module.exports = router;
