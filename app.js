const http = require("http");
const fs = require("fs");
const path = require("path");
const webServer = http.createServer((request, response) => {
  let filePath = path.join(__dirname,"public",request.url === "/" ? "index.html" : request.url); //short if 
  console.log(filePath);
 let extention = path.extname(filePath); //etxname: extension
 console.log(extention);
 let contetntType = "text/html"; //default
  switch (extention) {
     case ".js":
     contetntType = "text/javascript";
      break;
    case ".jpg":
        contetntType = "image/jpg";
      break;
    case ".json":
       contetntType = "aplication/json";
       break;
       case ".css":
     contetntType = "text/css";
        break;
       case ".png":
        contetntType = "image/png";
                 break;
   }
   fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile(path.join(__dirname, "public", "404.html"), (error,content) => {
        response.writeHead(404, { "content-Type": "text/html" });
          response.end(content);
}); //error: that file does not exist(No entity (file or directory) could be found by the given path) .
             
    }else {
       response.writeHead(200, { "content-Type": contetntType  });  //status code 200 means success
        response.end(content);
      }
    });
  });

  webServer.listen(3000, function() {
  console.log("server is runing on port 3000")
});
