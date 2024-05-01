// **********************read file in file system***********************

// var http=require("http");
// var fs=require('fs');
// http.createServer(function(req,res){

//     fs.readFile('demo.html',function(err,data){
//   res.writeHead(200,{'Content-Type':'text/html'});
//   res.write(data);

//   return res.end();

//     })
// }).listen(5007)

//**************** create file in file system ****************

// var fs = require('fs');

// fs.appendFile('mynewfile1.html', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

//******************modify(update) file using file system****************
// var fs = require('fs');
// fs.appendFile('mynewfile2.html', ' Welcome to node.js class', function (err) {
//   if (err) throw err;
//   console.log('Updated!');
// });

// ******************delete file using file system*****************
// var fs = require('fs');
// fs.unlink('mynewfile1.txt', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });

//******************rename file using file system*************
var fs = require('fs');

fs.rename('mynewfile1.html', 'myrenamedfile.html', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});
