/*
모듈은 변수, 함수 등의 코드를 모아놓고 파일로 저장한 단위
개발자가 모듈을 정의할 때는 내장 객체 중 exports 객체를 사용하면 됨
*/
//getMsg 메서드를 현재 모듈 안에 정의한다.
exports.getMsg=function(){
    return "this message is from my module";
}

exports.getRandom=function(n){
    var r=parseInt(Math.random()*n);//0~1미만 난수 발생
    //console.log(r);
    return r;
}
exports.getZeroString=function(n){
    var result=(n>=10)?n:"0"+n;
    return result;
}