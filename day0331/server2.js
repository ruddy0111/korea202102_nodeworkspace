/*
클라이언트 요청 받을 웹서버 구축
*/
var http=require("http");//http모듈 가져오기

var server = http.createServer();//서버 생성

server.on("connection", function(){
    console.log("클라이언트의 접속 감지")
});

server.listen(9999,function(){
    console.log("Second Server is running at 9999 port...")
});