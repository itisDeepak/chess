export class position{
    x:number;
    y:number;
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    samePosition(otherPosition:position):boolean{
        return (this.x===otherPosition.x && this.y===otherPosition.y);
    }
}