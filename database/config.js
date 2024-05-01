const mongoose = require('mongoose');

var con = mongoose.connect("mongodb+srv://sadhnakumari:sadhna12345@cluster0.dbbbht4.mongodb.net/Testing?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })

  // node scr/app.js
.then(()=>console.log("connection Successfully.."))
.catch((err)=>console.log(err));


module.exports = con;