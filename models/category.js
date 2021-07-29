var mongoose = require("mongoose");
const _ = require("lodash");

const CategorySchema = new mongoose.Schema({
  // movieId: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Movies",
  // },

name: {
    type: String,
    required: true,
  }
},
{
  toJSON:{
      virtuals:true,
      transform:(doc)=>{
          return _.pick(doc,["_id",'name'])
      }
  }
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;