var http=require("http");
var express=require("express");
var static=require("serve-static")
var request=require("request");

var app=express();
app.use(static(__dirname+"/static"));

app.get("/tourlist",function(req,res){
    request({
        url: "https://tour.chungbuk.go.kr/openapi/tourInfo/stay.do",
        method: 'GET'
    }, function (error, response, body) {
        res.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
        res.end(body)
    });
});

var server=http.createServer(app);
server.listen(7777,function(){
    console.log("server is running at 7777 port...")
});