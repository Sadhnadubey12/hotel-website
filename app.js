
const express=require('express');
const app=express();
const router=require("./controller/controller");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));


// const router=express.Router();
// app.get('/aboutus',function(req,res){
//     res.send("hello about us");
// })

app.set('view engine','ejs')



app.use(express.static('views'))

app.use(express.static('upload'))




app.use("/",router);
app.listen(5900);

