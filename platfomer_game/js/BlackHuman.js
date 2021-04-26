
/*나의 메모리 영역 뿐만 아니라 Human이라는 객체의 인스턴스 메모리 영역까지 확장하여 사용하겠다.*/
class BlackHuman extends Human{
    constructor(color){
        //바로 이 시점이 blackhuman이 태어나는 시점이므로
        //다른 어떠한 코드보다도 앞서서 부모를 태어나게 해야 한다.
        //color="red";
        //this.x=5; : 에러 발생! 부모의 초기화보다 자식의 초기화가 앞설 수 없기 때문. 금지.
        //=> 부모 생성자 호출보다 앞서는 코드의 존재 금지
        super(color);
        console.log("자식인 BlackHuman객체의 초기화 완료");
    }

    playBasketBall(){
        console.log("농구를 한다");
    }
    playBoxing(){
        console.log("복싱을 한다");
    }

}