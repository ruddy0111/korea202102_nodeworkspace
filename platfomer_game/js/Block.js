class Block extends GameObject{//이 시점부터 GameObject에 있는 모든 코드에 접근 가능
    constructor(container, src, width, height, x, y, velX, velY){
        super(container, src, width, height, x, y, velX, velY);//블럭인 내가 초기화 되기 전에, 부모를 먼저 초기화
    }
}