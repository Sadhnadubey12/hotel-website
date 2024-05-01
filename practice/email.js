var nodeMailer=require('nodemailer');
var transport=nodeMailer.createTransport({
host:'smtp.gmail.com',//simple mail transfer protocol(SMPT)? SMPT is used to send and receive email 

port:587,
secure:false,
requireTLS:true,//TLS is a way to provide secure connection between a client and a server 


auth:
{
user:"sadhnakumari55555@gmail.com",
pass:"uqzw sjug ikcu laya"


}

});

var mailOptions = {

    from:'sadhnakumari55555@gmail.com',
    to:'jamalkhatri9@gmail.com',
    subject: 'node mail',
    text: "Hello node.js"
}

transport.sendMail(mailOptions,function(error,info){

    if(error){
        console.warn(error);
    }

    else{
        console.warn('email has been send',info.response);
    }
})
