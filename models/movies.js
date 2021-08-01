var mongoose = require("mongoose");
const _ = require("lodash");
const MoviesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      Min:2
    },
    categoryId: 
      {
        type: mongoose.ObjectId,
        ref: "Category"
      }
    ,

  },
  {

    collection: "Movies",
    // toJSON: {
    //   virtuals: true,
    //   transform: doc => {
    //     return _.pick(doc, [
    //       "movieId",
    //       "name",
    //       "category"
    //     ]);
    //   }
    // }

  }
);
const Movies = mongoose.model("Movies", MoviesSchema);
module.exports = Movies;