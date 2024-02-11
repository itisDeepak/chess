import { TeamType } from "../Constants.ts";
import { Piece } from "../models/Piece.ts";
import { position } from "../models/Position.ts";
import { tileIsOccupied,tileIsOccupiedByOpponent,tileIsEmptyOrOccupiedByOpponent } from "./Generalrules.ts";

export const bishopMove=(initialPosition:position,desiredPosition:position,team:TeamType,boardState:Piece[]):boolean=>{
    for(let i=1;i<8;i++){
        //upright movement
        if(desiredPosition.x>initialPosition.x && desiredPosition.y>initialPosition.y){
            let passedPosition=new position(initialPosition.x+i,initialPosition.y+i);
            if(passedPosition.x===desiredPosition.x && passedPosition.y===desiredPosition.y){
                //dealing with destination tile
                if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                    return true;
                }
            }
            else{
                //dealing with passing tile
                if(tileIsOccupied(passedPosition,boardState)){
                    break;
                }
            }
            
        }
        
        //bottom right movement
        if(desiredPosition.x>initialPosition.x && desiredPosition.y<initialPosition.y){
            let passedPosition=new position(initialPosition.x+i,initialPosition.y-i);
            console.log(passedPosition.x,passedPosition.y);
            if(passedPosition.x===desiredPosition.x&& passedPosition.y===desiredPosition.y){
                //dealing with destination tile
                if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                    return true;
                }
            }
            else{
                //dealing with passing tile
                if(tileIsOccupied(passedPosition,boardState)){
                    break;
                }
            }
        }
        
        //bottom left movement
        if(desiredPosition.x<initialPosition.x && desiredPosition.y<initialPosition.y){
            let passedPosition=new position(initialPosition.x-i,initialPosition.y-i);
            if(passedPosition.x===desiredPosition.x&& passedPosition.y===desiredPosition.y){
                //dealing with destination tile
                if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                    return true;
                }
            }
            else{
                //dealing with passing tile
                if(tileIsOccupied(passedPosition,boardState)){
                    break;
                }
            }
        }
        
        
        //upleft movement
        if(desiredPosition.x<initialPosition.x && desiredPosition.y>initialPosition.y){
            let passedPosition=new position(initialPosition.x-i,initialPosition.y+i);
            if(passedPosition.x===desiredPosition.x&& passedPosition.y===desiredPosition.y){
                //dealing with destination tile
                if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                    return true;
                }
            }
            else{
                //dealing with passing tile
                if(tileIsOccupied(passedPosition,boardState)){
                    break;
                }
            }
        } 
    }return false;
    
}

export const getPossibleBishopMoves=(bishop:Piece,boardState:Piece[]):position[]=>{
    let possibleMoves:position[]=[];
    for(let i=1;i<8;i++){
        const destination=new position(bishop.position.x+i,bishop.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,bishop.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(bishop.position.x-i,bishop.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,bishop.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(bishop.position.x+i,bishop.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,bishop.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(bishop.position.x-i,bishop.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,bishop.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    return possibleMoves;
}