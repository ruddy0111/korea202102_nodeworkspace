var http=require("http");//내장 모듈이므로 별도 설치 불필요
var fs=require("fs");//파일을 제어하는 내장모듈

var server=http.createServer(function(request, response){
    //request:클라이언트의 요청 정보
    //response:클라이언트에게 보낼 응답 정보

    //fs.readFile("파일명", "인코딩", 읽었을 때 실행할 함수);
    fs.readFile("./regist_form.html", "utf8", function(err, data){
  //클라이언트에 지정한 문자열을 전송
  response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});//header정보를 제대로 갖추어서 응답하자.
  response.end(data);//클라이언트에 지정한문자열 가동
    });
});

server.listen(7878, function(){
    console.log("My server is running at 7878...")
});//서버 가동
