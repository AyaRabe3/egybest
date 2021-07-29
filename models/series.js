var mongoose = require("mongoose");
const _ = require("lodash");
const SeriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      Min:2
    },
    category: [
      {
        type: mongoose.ObjectId,
        ref: "Category"
      }
    ],

  },
  {

    collection: "Series",
    toJSON: {
      virtuals: true,
      transform: doc => {
        return _.pick(doc, [
          "id",
          "category"
        ]);
      }
    }

  }
);
const Series = mongoose.model("Series", SeriesSchema);
module.exports = Series;