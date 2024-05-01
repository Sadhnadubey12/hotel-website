
// http code to run that on server using localhost:5200

var http=require('http');
http.createServer(function(req,res)
{

res.write('<h1> hello from node js server </h1>');
res.write('hello from node js server');
res.write('hello from node js server');
res.end();
}).listen(5200)