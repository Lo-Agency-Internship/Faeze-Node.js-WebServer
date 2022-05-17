const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname,"public",req.url === "/" ? "index.html" : req.url); //short if 
 let extname = path.extname(filePath); //etxname: extension
 let contetntType = "text/html"; //default
  switch (extname) {
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
   fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
         fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(404, { "content-Type": "text/html" });
          res.end(data);
        });//ENOENT means: that file does not exist(No entity (file or directory) could be found by the given path) .
            } 
      } else {
       res.writeHead(200, { "content-Type": contetntType  });
        res.end(data);
      }
    });
  });

server.listen(3000, () => console.log("server runing on port 3000"));
