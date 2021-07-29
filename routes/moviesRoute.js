const Movies = require("../models/movies");
const Category = require("../models/category");
const express = require("express");
const mongoose = require("mongoose");

require("express-async-errors");
const router = express.Router();


//-----------------------add---------------------------------------//
router.post("/addMovie", async (req, res) => {
    const { name, category } = req.body;
    const newMovie = new Movies({
      name,
      category
    });
    let movieAdded= await Movies.findByIdAndUpdate(name, {
      $push: { movie: newMovie }
    });
    console.log("pushed", movie);
    await movieAdded.save();
    res.json({
      newMovie
    });
  });
  

//----------------------get all Movies-----------------------------//
router.get("/getAllMovies", async (req, res, next) => {
  const movies = await Movies.find().populate("category");
  res.json(movies);
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
    id = req.movie.id;
    const {
      name,
      category,
      
    } = req.body;
    const movie = await Movies.findByIdAndUpdate(
      id,
      {
        $set: {
        name,
        category
        }
      },
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      }
    ).populate("category");
    res.status(200).json(movie);
  }
);




//////////////////////////Add category hereee//////////////////////////
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
router.get("/getAllCategories", async (req, res, next) => {
    const category = await Category.find().populate("category");
    res.json(category);
  });


module.exports = router;
