import { TeamType } from "../Constants.ts";
import { Piece } from "../models/Piece.ts";
import { position } from "../models/Position.ts";

export const tileIsOccupied=(position:position,boardState:Piece[]):boolean=>{
    console.log("Checking if tile is occupied");
    const piece=boardState.find(p=>p.samePosition(position));
    if(piece){
    return true;
    }
    else{
        return false;
    }
}

export const tileIsOccupiedByOpponent=(position:position,boardState:Piece[],team:TeamType):boolean=>{
const piece=boardState.find((p)=>p.samePosition(position) &&p.team!=team);
if(piece){
    return true;
}
else{
    return false;
}
}


export const tileIsEmptyOrOccupiedByOpponent=(position:position,boardState:Piece[],team:TeamType):boolean=>{
return (!tileIsOccupied(position,boardState) || tileIsOccupiedByOpponent(position,boardState,team));
}