/*
node.js는 브라우저 탑재된 자바스크립트와는 목적이 다르다.
즉 응용프로그램 개발 중 주로 서버를 개발할 때 많이 사용 됨.
*/
var http=require("http");//웹 기본 서버 모듈
//이 모듈만 있으면 기본적인 웹 서버를 구축할 수 있다.
var server = http.createServer();//서버 객체 생성

//생성된 서버 객체를 이용하여, 서버를 가동해본다.
server.listen(9999, function(){
    console.log("My Server is running at 9999 port...")
});