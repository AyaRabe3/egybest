const Movies = require("../models/movies");
const Category = require("../models/category");
const express = require("express");
const mongoose = require("mongoose");
const { result } = require("lodash");
const { query } = require("express-validator");

require("express-async-errors");
const router = express.Router();


//----------------------- add Movies -----------------------------------//
router.post("/addMovie", async (req, res) => {
    const { name, categoryId } = req.body;
    const newMovie = new Movies({
      name,
      categoryId
    });
    await newMovie.save();
    res.json({
      newMovie
    });
  });
  

//----------------------get all Movies-----------------------------//
router.get("/getAllMovies", async (req, res, next) => {
  const movies = await Movies.find().populate("categoryId");

  let newMovies = movies.map(e=> (
    e = {
      name: e.name,
      id: e.id,
      categoryId: e.categoryId._id,
      categoryName: e.categoryId.name
    }
  ))
  
  res.json(newMovies);
});

//-----------------get Movies by id ---------------------------//
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movies.findById(id)
    .populate("category")
  res.json(movie);
  console.log("movie  is", movie);
});
//---------------------------UpdateMovie---------------------------//
router.patch(
  "/Edit/:id",
  async (req, res, next) => {
    id = req.params.id;
    console.log("id",id)
    const {
      name,
      categoryId,
         } = req.body;
     const movie = await Movies.findByIdAndUpdate(
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
    res.status(200).json(movie);
  }
);

//-------------------------- delete movie -------------------------//
router.delete("/:id",async(req,res,next)=>{
  const {id} =req.params
  const movieToDelete=await Movies.findByIdAndDelete(id)
  res.json(movieToDelete)
})

//----------------------- search by name and category ----------------//
// router.get("/search/?:name/?:id", async (req, res, next)=> {
    
//   const{name,id}=req.params;
//   const movie= await Movies.find();
//   let result= movie.filter(movie=> {
//     if( movie.name.includes(name)||movie.id.includes(id))
//     console.log(movie)
//     return movie;
//     });

//     res.status(200).json(result);
   
//      })



// router.get("/search",(req,res,next)=>{
//   const searchedFeilds=req.query.name
//   Movies.find({name:{$rejex:searchedFeilds,$options:'$i'}})
//   .then(data=>
//     res.send(data))
// })

////------------------ search by name and category ------------------///
router.post("/search/:name?",async(req,res,next)=>{
  const searchedFeilds=req.params.name 
  const {categoryId}=req.body

  if(searchedFeilds &&!categoryId){
    let result= await Movies.find({ name: new RegExp(searchedFeilds, 'i')})
    res.send(result)

  }
  else if(!searchedFeilds && categoryId){
    let result= await Movies.find({categoryId:categoryId})
    res.send(result)
  }

  else if (searchedFeilds && categoryId){
    let result= await Movies.find({ name: new RegExp(searchedFeilds, 'i'),categoryId:categoryId})
    res.send(result)
  }
  })
  

module.exports = router;


