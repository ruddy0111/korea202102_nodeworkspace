/* 
자바에서는 xml과 관련된 qpi가 자체적으로 지원되지만, node js는 xml을 해석하기 위해서는 외부 모듈을 사용해야한다.

XML vs Json

공통점 : 데이터 교환을 위한 형식, 포맷이다
        쓰는 이유 : 구조화 되어 있기 때문에 데이터에 대한 표현이 체계적이다.

차이점 : xml 구조화를 태크로 표현
            json 구조화를 객체 표기법으로 표현


자바와 같은 응용프로그램에서는 xml을 해석하는 작업은 까다롭다.
하지만, node.js에서는 xml을 자동으로json으로 변환해주는 모듈이 지원된다.

xml-js 모듈 설치해보자.
*/

var xmlConverter = require("xml-js");
var fs=require("fs");


// var tag="<members>";
// tag+="<member>";
// tag+="<name>배트맨</name>";
// tag+="<age>38</age>";
// tag+="</member>";  
// tag+="<member>";
// tag+="<name>수퍼맨</name>";
// tag+="<age>37</age>";   
// tag+="</member>";  
// tag+="<member>";
// tag+="<name>앤트맨</name>";
// tag+="<age>37</age>";   
// tag+="</member>";  
// tag+="</members>";

// var json = xmlConverter.xml2json(tag);

fs.readFile("member.xml","utf8",function(error,data){
        var json = xmlConverter.xml2json(data,{compact:true,spaces:2});
        console.log(json);
})