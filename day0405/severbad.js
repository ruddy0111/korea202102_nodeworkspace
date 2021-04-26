var http = require("http"); //내장 모듈 가져오기 
var fs = require("fs");//파일 시스템 모듈
var qs=require("querystring");//쪼개져서 직렬화된 전송 데이터에 대한 해석 담당
var mysql=require("mysql");//외부 묘듈 설치

var conStr={
    url:"localhost:3306",
    database:"nodejs",
    user:"root",
    password:"1234"
}

var server = http.createServer(function(request, response){
    //결국 서버는 클라이언트의 다양한 요청을 처리하기 위해,  요청을 구분할 수 있어야 한다..
    //결국 클라이언트가 서버에게 무엇을 원하는지에 대한 정보는 요청 URL 로 구분할 수 있다..
    //따라서 요청과 관련된 정보를 가진 객체인 request 객체를 이용하자!!
    console.log("클라이언트가 지금 요청한 주소는 ",  request.url);
    //  도메인:포트번호까지를 루트로 부르자~!! 
    /*
    회원가입 폼 요청 : /member/form
    회원가입 요청 : /member/join
    회원 목록(검색은 목록에 조건을 부여한 것임..) 요청 : /member/list
    회원 상세 보기 요청: /member/detail
    회원 정보 수정 요청: /member/edit 
    회원 정보 삭제 요청 : /member/del
    */
    switch(request.url){
        case "/member/form": registForm(request, response);break;
        case "/member/join": regist(request, response);break;
        case "/member/list": getList(request, response);break;
        case "/member/detail": getDetail(request, response);break;
        case "/member/edit": edit(request, response);break;
        case "/member/del": del(request, response);break;
    }    
}); //서버 객체 생성 
    function registForm(request, response){
        fs.readFile("./regist_form.html","utf8", function(err, data){
            //파일을 다 읽어들이면 응답 정보 구성하여 클라이언에게 전송
            response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
            response.end(data);
        });
    }

    function regist(request, response){
        //클라이언트가 post방식으로 전송했기 때문에 Http 데이터 구성 중 body를 통해 전송되어온다.
        // post 방식의 파라미터를 끄집어 내보자
        //on:request객체가 보유한 데이터 감지 메서드
        var content="";
        request.on("data", function(param){
            //param에는 bodt안에 들어있는 데이터가 서버의 메모리 버퍼로 들어오고 그 데이터를 param이 담고있다
            content+=param;//버퍼의 데이터를 모으자
        });//post 방식의 데이터를 감지 
        //데이터가 모두 전송되어 모아지면 end이벤트 발생
        request.on("end",function(){
            console.log("전송받은 데이터는", content);
            console.log("파싱한 데이터는", qs.parse(content));
            
            var obj=qs.parse(content);
            //파싱한 결과는 객체지향 개발자들이 쉽게 해석이 가능한 json반환
            //접속을 시도하는 메서드의 반환값으로, 접속 정보 객체가 반환되는데, 이 객체를 이용하여 쿼리 실행
            var con=mysql.createConnection(conStr);

            var sql="insert into member(user_id, user_name, user_pass)";
            sql+=" values('"+obj.user_id+"','"+obj.user_name+"','"+obj.user_pass+"')";
            con.query(sql, function(err,fields){
                if(err){
                    response.writeHead(500, {"Content-Type":"text/html;charset=utf-8"});
                    response.end("서버 오류 발생");
                }else{
                    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                    response.end("회원 가입 성공<br><a href='/member/list'>회원목록 바로 가기</a>");
                }
            });//쿼리문을 실행하는 메서드 명은 query()
        });
    }
    //이 방법은 디자인 마저도 프로그램 코드에서 감당하고 있기 때문에 유지 보수성이 낮다.
    //따라서 프로그램 코드와 디자인은 분리되어야 좋다
    function getList(request, response){
        //회원 목록 가져오기
        var con=mysql.createConnection(conStr);
        var sql="select * from member";
        //2번째 인수 : select문 수행결과 배열, 3번째 인수 : 컬럼에 대한 메타 정보(메타 데이터 : 정보의 정보)
        con.query(sql, function(err,fields,result){
            // console.log("쿼리문 수행 후 mysql로부터 받아온 데이터는",result);
            // //result분석하기.
            // console.log("결과 레코드 수는",result);
            // console.log("컬럼정보",fields);
            var tag="<table width='100%' border='1px'>";
            for(var i=0;i<result.length;i++){
                var member =  result[i]; //한사람에 대한 정보
                var member_id=member.member_id;
                var user_id=member.user_id;
                var user_name=member.user_name;
                var user_pass=member.user_pass;
                var regdate=member.regdate;//등록일

                tag+="<tr>";
                tag+="<td>"+member_id+"</td>"
                tag+="<td>"+user_id+"</td>"
                tag+="<td>"+user_name+"</td>"
                tag+="<td>"+user_pass+"</td>"
                tag+="<td>"+regdate+"</td>"
                tag+="</tr>";
            }
            tag+="<tr>";
            tag+="<td colspan='5'><a href='/member/form'></a></td>";
            tag+="</tr>";
            tag+="</table>"
            response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
            response.end(tag);
        });
    }
    function getDetail(request, response){
    }
    function edit(request, response){
    }

    function del(request, response){
    }




server.listen(7979, function(){
    console.log("Server is running at 7979 port...");
});