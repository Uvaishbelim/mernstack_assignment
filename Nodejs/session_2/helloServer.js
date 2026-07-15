const http = require("http");

const server = http.createServer((req, res) => {
//   res.end("Welcome to NodeJS Web Server");
  
if(req.method === "POST"){
    res.end("post request received")
}else if(req.method ==="GET"){
    if (req.url === "/about") {
        res.end("About Us Page");
      } else {
        res.end("Home Page");
      }
    }else{
        res.end("Request method not supported");
    }
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
