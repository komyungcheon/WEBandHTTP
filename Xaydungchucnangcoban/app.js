const http = require("http");
const sever = http.createServer((req, res) => {
    let txt = "";
    if(req.url === "/login"){
        txt = "Login thanh cong"
    }else {
        txt = "Login that bai"
    }
    res.end(txt);
})
sever.listen(8080,"localhost")