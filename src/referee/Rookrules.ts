import { TeamType } from "../Constants.ts";
import { Piece } from "../models/Piece.ts";
import { position } from "../models/Position.ts";
import { tileIsOccupied,tileIsOccupiedByOpponent,tileIsEmptyOrOccupiedByOpponent } from "./Generalrules.ts";

export const rookMove=(initialPosition:position,desiredPosition:position,team:TeamType,boardState:Piece[]):boolean=>{
    if(desiredPosition.x===initialPosition.x){
        let multiplier=(desiredPosition.y>initialPosition.y)?1:-1;

        for(let i=1;i<8;i++){
            let passedPosition=new position(initialPosition.x,initialPosition.y+(i*multiplier));
            if(passedPosition.x===desiredPosition.x&& passedPosition.y===desiredPosition.y){
                if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                    return true;
                }                    
            }
            else{
                if(tileIsOccupied(passedPosition,boardState)){
                    break;
                }
            }
        }
    }
        
    if(desiredPosition.y===initialPosition.y){
        let multiplier=(desiredPosition.x>initialPosition.x)?1:-1;

        for(let i=1;i<8;i++){
            let passedPosition=new position(initialPosition.x+(i*multiplier),initialPosition.y);
            if(passedPosition.x===desiredPosition.x&& passedPosition.y===desiredPosition.y){
                if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                    return true;
                }                    
            }
            else{
                if(tileIsOccupied(passedPosition,boardState)){
                    break;
                }
            }
        }
    }return false;
}

export const getPossibleRookMoves=(rook:Piece,boardState:Piece[]):position[]=>{
    let possibleMoves:position[]=[];
    for(let i=1;i<8;i++){
        const destination=new position(rook.position.x,rook.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,rook.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(rook.position.x,rook.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,rook.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(rook.position.x+i,rook.position.y);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,rook.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(rook.position.x-i,rook.position.y);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,rook.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    return possibleMoves;
}