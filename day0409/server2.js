/*오라클 데이터 베이스 접속
오라클 인스턴스 및 리스너 프로세스가 가동되어 있어야 한다.
특히 Listener */
var oracledb=require("oracledb");
var conStr={
    user:"node",
    password:"node",
    connectString:"localhost/xe"
};

oracledb.getConnection(conStr, function(err, con){
    if(err){
        console.log("접속실패", err);
    }else{
        console.log("접속 성공")
    }
});