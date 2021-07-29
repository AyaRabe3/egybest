const express = require("express");
const app = express();
const port = 4402;
const moviesRouter = require("./routes/moviesRoute");
const seriesRouter = require("./routes/seriesRoute");

require("express-async-errors");
var cors = require("cors");
app.use(cors());

require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/movies", moviesRouter);
// app.use("/series", seriesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    return res.status(statusCode).json({
      message: err.message,
      type: "INTERNAL_SERVER_ERROR",
      details: [],
    });
  } else {
    res.status(statusCode).json({
      message: err.message,
      type: err.type,
      details: err.details,
    });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);