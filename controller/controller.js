const express=require('express');
const router=express.Router();

const multer = require('multer');

var session = require("express-session");

var cookieParser = require("cookie-parser");

let register= require('../model/register_schema');

let contact= require('../model/contact_schema');

let booking= require('../model/booking_schema');

// router.get('/',(req,res)=>{
//     res.render('index');
// })

// ********************************** session and cookieParser **********************//
router.use(cookieParser());
router.use(
    session({
        key: "user_sid",
        secret:"somerandomstuffs",
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires:600000
        },
    })
    
)


//**************** index get page *************************//
router.get("/", async (req,res)=> {

    try {

        const regdata = await booking.find({});
        res.render('index',{regdata:regdata});
        console.log(regdata);
    } catch (err){
        console.log(err);
    }

});


//***********************************File upload section**********************************

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }

  });
  let fileFilter = (req, file, cb) => {
    let allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp','text/html'];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
//   const maxSize =1024;
//   let upload = multer({ storage, fileFilter,limits:{fileSize:maxSize} });
  let upload = multer({ storage, fileFilter});


// router.get('/room1',(req,res)=>{
//     res.render('room1');
//      })



router.get("/room_1/:id", async(req,res)=>{
  
    try{

        const regdata=await booking.findById(req.params.id);
        res.render('room1',{regdata:regdata});
        //console.log(room1);

    }catch (err){

    console.log(err)

}

});


//****************** */ Common page *********************

//************contact page ****************** //

router.get('/contact',(req,res)=>{
    res.render('contact');
})

router.post('/contact',(req,res)=>{

    var user1 = new contact({
    name: req.body.name,
    email:req.body.email,
    password:req.body.password,
    number:req.body.number,
    message:req.body.message   
    });

    user1.save().then(()=>{
        console.log("saved data")
    })

    .catch((err)=>{
    console.log(err);
})

});


router.get('/about',(req,res)=>{
    res.render('about');
})

// login api//

//get api for login
// router.get('/login',(req,res)=>{
//     res.render('login');
// })

//login page  post api//
// router.post('/login',async(req,res)=>{
//     var email =req.body.email,
//     password=req.body.password;
//     try{
//         const login=await register.findOne({email:email});
//         console.log(login);
//         if(!login){
//             res.redirect("/login");
//         }
//         else{
//             req.session.user=login;
//             res.redirect('/dashboard')
//         }
//     }
//     catch(error){
//         console.log(error);
//     }
// });


//login page api

router.get('/login', (req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
    var email =req.body.email,
    password=req.body.password;
    try{
        const login=await register.findOne({email:email});
        console.log(login);
        if(!login){
            res.redirect('/login');
            
        }
        login.comparePassword(password,(error,match)=>{
            if(!match){
                res.redirect("/login");
            }
        });
            req.session.user = login;
            res.redirect('/dashboard');
}
    catch(error){
        console.log(error);
    }
});



//************************* register page************************** //

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',(req,res)=>{

    var user = new register({
    fullname: req.body.fullname,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword
   
    });

    user.save().then(()=>{
        console.log("saved data")
    })

    .catch((err)=>{
    console.log(err);
})

});


// =====================dashborad section ================================== //

// *************** dashbaord page with cookies & session api ******************//

// router.get('/dashboard', async(req, res) => {
//     if(req.session.user && req.cookies.user_sid){
//     res.render('dashboard/index');
//   }
    
//     else{
//       res.redirect("/login");
//     }

//   });

// login api //

router.get('/dashboard',(req, res)=>{
    if(req.session.user && req.cookies.user_sid){
    var user= req.session.user;
    
    res.render('dashboard/index');
  }

  });
  
  //logout api //

  router.get('/logout',(req,res,next)=>{
    if(req.session){
        req.session.destroy(function(error){
        if(error){
           return next(error);
        }
        else {
            return res.redirect('/')
        }
        })
    }
  })











//*************/ contact page with cookies & session api ************ //
router.get("/viewcontact", async (req,res)=> {
 if(req.session.user && req.cookies.user_sid){

    try {

        const regdata = await contact.find({});
        res.render('dashboard/viewcontact',{regdata:regdata});
        console.log(regdata);
    } catch (err){
        console.log(err);

    }}else{
        res.redirect('/login')
    }

});


// ********************registraction page with cookies & session api****************** //
router.get("/registration", async (req,res)=> {
if(req.session.user && req.cookies.user_sid){


    try {

        const regdata = await register.find({});
        res.render('dashboard/registration',{regdata:regdata});
        console.log(regdata);
    } catch (err){
        console.log(err);

    }}else{
        res.redirect('/login')
    }

});

// *********************hotel booking with cookies & session api********************//
router.get('/hotelbooking',(req,res)=>{
if(req.session.user && req.cookies.user_sid){
res.render('dashboard/hotelbooking');
}
else{
    res.redirect('/login')
}
});



router.post('/hotelbooking', upload.single('image'), (req, res) => {
    var user2 = new booking({
        name: req.body.name,
        price:req.body.price,
        description:req.body.description,
        image: req.file.filename
      
    });

    user2.save().then(()=>{
        console.log("saved data")
    })

    .catch((err)=>{
    console.log(err);
})

});
  

//*********************viewbooking**************** //

router.get("/viewbooking", async (req,res)=> {
if(req.session.user && req.cookies.user_sid){


    try {

        const regdata = await booking.find({});
        res.render('dashboard/viewbooking',{regdata:regdata});
        console.log(regdata);
    } catch (err){
        console.log(err);

    }}else{
        res.redirect('/login')
    }

});


// **************view booking delete api****************** //

router.get('/delete_1/:id', async (req, res)=>{
    try{
        const regdata = await booking.findByIdAndDelete(req.params.id);
        res.redirect('/viewbooking');
    } catch (err){
        console.log(err);
    }
});



// **************view contact delete api****************** //

router.get('/delete_2/:id', async (req, res)=>{
    try{
        const regdata = await contact.findByIdAndDelete(req.params.id);
        res.redirect('/viewcontact');
    } catch (err){
        console.log(err);
    }
});



// **************view registration delete api****************** //

router.get('/delete_3/:id', async (req, res)=>{
    try{
        const regdata = await register.findByIdAndDelete(req.params.id);
        res.redirect('/registration');
    } catch (err){
        console.log(err);
    }
});

//*********************************/ edit booking ********************* //

//************* get booking **************//

router.get('/edit2/:id', async (req, res) => {
    try {
        const regdata = await booking.findById(req.params.id);
        res.render('dashboard/edit_booking', { regdata: regdata });
        console.log(regdata);
    } catch (err) {
        console.log(err);
    }
});


//*************/ post booking **************//

router.post('/edit2/:id', async (req, res) =>{
    const itemId = req.params.id;
    const updatedData = {
        name: req.body.name,
        price:req.body.price,
        description:req.body.description,
        image: req.file.filename
        };
    
    try{
        const updatedItem = await booking.findByIdAndUpdate(itemId, updatedData);

        if(!updatedItem) {
             return res.status(404).json({ message: 'data not found'});
         }
        res.redirect('/edit_booking');

        //res.json(updatedItem);
    } catch(err) {
        res.status(500).json({ message: 'Server error'});
    }
 });


//*********************************/ edit registration ********************* //

//*************** Get edit api ********************//


router.get('/edit/:id', async (req, res) => {
    try {
        const regdata = await register.findById(req.params.id);
        res.render('dashboard/edit_registration', { regdata: regdata });
        console.log(regdata);
        // res.redirect('./edit_registration');
    } catch (err) {
        console.log(err);
    }
});

// //*************** post edit api ********************//

router.post('/edit/:id', async (req, res) =>{
    const itemId = req.params.id;
    const updatedData = {
    fullname: req.body.fullname,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword
    };
    
    try{
        const updatedItem = await register.findByIdAndUpdate(itemId, updatedData);

        if(!updatedItem) {
             return res.status(404).json({ message: 'data not found'});
         }
        res.redirect('/registration');

        //res.json(updatedItem);
    } catch(err) {
        res.status(500).json({ message: 'Server error'});
    }
 });

// *********************hotel booking page********************//
router.get('/cancelbooking',(req,res)=>{
    res.render('dashboard/cancelbooking');
})


module.exports=router;
