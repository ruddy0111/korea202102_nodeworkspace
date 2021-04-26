/*서버구축하기*/
var http=require("http");
var fs=require("fs");
//mysql연동하기 위한 모듈 가져오기, 외부 모듈이므로 개발 시 추가 설치가 필요하다.
//추가 설치 명령어 cmd->npm install mysql
var mysql=require("mysql");

var server=http.createServer(function(request, response){
    //클라이언트에 응답하기
    //클라이언트에게 보여줄 html 문거를 이루고 있는 코드를 읽어들여서
    //응답정보로 보내야 한다.
    //매개변수 순서지키면 들어감

    //클라이언트가 브라우저의 URL에 어떤 주솔들 입력했는지를 조사해보자
    //그 조사 결과에 따라서 아래 코드 중 어떤 코드가 실행될지를 결정짓자
    //request객체란 클라이언트의 요청 정보를 가진 객체이기 때문에 클라이언트가 입력한 url
    //정보도 이 객체를 통해 얻어낼 수 있다.

    var url = request.url;
    console.log("클라이언트가 요청시 입력한 주소는 : ",url);

    // localhost:8888/form : 회원가입 디자인 폼 요청으로 간주
    // localhost:8888/regist : 회원가입 요청으로 간주
    // localhost:8888/result : 회원가입 완료로 간주

    if(url=="/member/form"){
        fs.readFile("./regist_form.html", "utf8", function(error,data){
            //파일의 내용을 모두 읽어들인 순간 이 익명함수가 동작함.
            response.end(data);
        });
    }else if(url=="/member/regist"){//등록을 원하면
        //쿼리문 수행 전에, node.js가 mysql에 접속 성공해야한다.
        var con=mysql.createConnection({
            url:"localhost:3306",//db는 네트워크 프로그램이라 전용 포트 사용.
            database:"nodejs",//사용 중인 database.명
            user:"root",
            password:"1234"
        });//접속
        console.log("접속결과객체", con);

        var sql="insert into member(user_id, user_pass, user_name)";
        sql+=" values('superman','0000','슈퍼맨');" //values 앞에 한 칸 띄어써야함.

        con.query(sql, function(err,fields){
            if(err){
                console.log("쿼리문 수행 중 에러발생", err);
            }else{
                console.log("등록성공");
            }
        });
    }else if(url=="/member/result"){
        fs.readFile("./result.html", "utf8", function(error,data){
            //파일의 내용을 모두 읽어들인 순간 이 익명함수가 동작함.
            response.end(data);
        });
    }


});

server.listen(8888,function(){
    console.log("Server is running at 8888....");
});