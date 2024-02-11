import { TeamType} from "../Constants.ts";
import { Piece } from "../models/Piece.ts";
import { position } from "../models/Position.ts";
import { tileIsEmptyOrOccupiedByOpponent } from "./Generalrules.ts";

export const knightMove=(initialPosition:position,desiredPosition:position,team:TeamType,boardState:Piece[]):boolean=>{
    for(let i=-1;i<2;i+=2){
        for(let j=-1;j<2;j+=2){
            //Top and Bottom side movement
            if(desiredPosition.y-initialPosition.y===2*i){
                if(desiredPosition.x-initialPosition.x===j){
                    if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                        return true;
                    }
                }
            } 

            //left and right side movement 
            if(desiredPosition.x-initialPosition.x===2*i){
                if(desiredPosition.y-initialPosition.y===j){
                    if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                        return true;
                    }
                }
            }
        } 
    }return false;
}

export const getPossibleKnightMoves=(knight:Piece,boardState:Piece[]):position[]=>{
    const possibleMoves:position[]=[];
    for(let i=-1;i<2;i+=2){
        for(let j=-1;j<2;j+=2){
            const verticalMove=new position(knight.position.x+j,knight.position.y+i*2);
            const horizontalMove=new position(knight.position.x+i*2,knight.position.y+j);
        
            if(tileIsEmptyOrOccupiedByOpponent(verticalMove,boardState,knight.team)){
                possibleMoves.push(verticalMove);
            }
            if(tileIsEmptyOrOccupiedByOpponent(horizontalMove,boardState,knight.team)){
                possibleMoves.push(horizontalMove);
            }
        }
    }return possibleMoves;
}