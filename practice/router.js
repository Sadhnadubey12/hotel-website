var express = require('express');
var app = express();



const router = express.Router();
router.get('/',function(req,res) 

{
    // res.sendFile(__dirname+"/landing_page.html");
    res.send("hello sadhna")
})

// router.get('/about_us',function(req,res)
// {
// res.sendFile(__dirname+"/about_us.html");
// })
app.use('/',router);
app.listen(5300)