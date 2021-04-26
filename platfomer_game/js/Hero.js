class Hero extends GameObject{
    constructor(container, src, width, height, x, y, velX,velY){
        //부모의 생성자 메서드를 호출하자(메서드 빠짐없이)
        super(container, src, width, height, x, y,velX,velY);
        this.g=0.5;//중력 가속도를 만들기 위한 변수. hero 개인 만의 것.
        this.jump=false;//주인공의 점프상태를 판단할 수 있는 변수(즉 점프 유무)

    }
    //히어로는 움직임이 있다. 따라서 메서드 정의가 필요하다.
    //그러나, 부모에게 물려받은 메서드가 현재 나의 상황에 맞지 않을 경우 업그레이드 할 필요가 있다.
    //java, c#등 opp언어에서는 이러한 메서드를 가리켜 오버라이딩이라 한다.
    tick(){
    //코드에서는 보이지 않지만, 현재 클래스는 GameObject의 모든 것을 가지고 있으므로 접근 가능
        this.velY+=this.g;//중력을 표현하기 위해 가속도로 처리
        this.y+=this.velY;
        this.x+=this.velX;
        

        //현재 화면에 존재하는 모든 벽돌들을 대상으로, 주인공의 발바닥과 닿았는지 판단
        for(var i=0;i<blockArray.length;i++){
            var onBlock=collisionCheck(this.img,blockArray[i].img);
            //onBlock이 true이면 벽돌에 바닥이 닿은 것.
            /**
             * 1) 속도를 없애고
             * 2) 1번의 조건은 무조건 수행하지 말고, 우리가 원할 때만 수행하도록 제어하자.
             * 3) 왜냐하면 점프하기 위해서는 vel값이 0이 되어버리면 안되므로.
             */
            if(onBlock&&this.jump==false){
                this.velY=0;//점프 버튼을 누르면, velY값을 0으로 묶어놓지 말자
                this.y=blockArray[i].y-this.height;//위치를 벽돌 위에 고정(벽돌의 y값보다 자신의 키만큼 위로)
            }
            if(this.velY>0){//다시 아래로 떨어지는 순간!
                this.jump=false;
            }
        }
    }
    render(){
        // console.log("gyqkqhwn");
        this.img.style.top=this.y+"px";
        this.img.style.left=this.x+"px";

    }
}
