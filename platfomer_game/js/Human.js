class Human{
    constructor(color) {
        this.strength=100;
        this.color=color;
        this.eyeCount=2;
        console.log("부모인 Human객체의 초기화 완료");
    }
    walk(){
        console.log("걷는다");
    }
    playBasketBall(){
        console.log("농구를 한다");
    }
    playBoxing(){
        console.log("복싱을 한다");
    } 
}