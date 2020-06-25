const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const blogRoutes = require('./api/routes/BlogRoutes');

const adminRoutes = require('./api/routes/adminRoute');

const url = process.env.MONGODB_URI ||
"mongodb+srv://Rajath:Rajath2000@cluster0-ajgkh.mongodb.net/Cluster0?retryWrites=true&w=majority";

console.log(url);
mongoose.connect( url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//PREVENT CORS ERRORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use('/blogs', blogRoutes);
app.use('/admin', adminRoutes);

//Catch errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

}

module.exports = app;
