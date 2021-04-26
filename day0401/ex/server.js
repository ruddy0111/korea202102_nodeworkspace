/*
node.js는 웹브라우저에서 사용되는 js문법을 거의 그대로 사용하기 때문에
자체적인 능력에 한계가 있다. 그러나 모듈을 통해 엄청난 확장성을 지닌다.
전세계 개발자들에 의해 모듈이 공유된다.
*/

//기본적 웹서버 모듈 가져오기
//http 등의 모듈은 이미 node.js설치 시 함께 포함이 된다. 이러한 내장된 모듈을 가리켜 내장 모듈이라 한다.
var http = require("http");//내장모듈

var md=require("./mymodule.js")
//console.log(md.getMsg());

var server=http.createServer(function(request,response){
    response.end(md.getMsg());
});
/*request : 클라이언트 요청 정보 담고 잇는 객체
response : 클라이언트에 응답할 정보를 담고 잇는 객체*/
//1~1024 사이 포트번호는 시스템이 이미 사용중이므로 피하자.

server.listen(7777,function(){
    console.log("My Server is running at 7777...")
});//서버 가동