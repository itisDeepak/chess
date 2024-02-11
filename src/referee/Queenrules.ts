import { TeamType } from "../Constants.ts";
import { Piece } from "../models/Piece.ts";
import { position } from "../models/Position.ts";
import { tileIsOccupied,tileIsOccupiedByOpponent,tileIsEmptyOrOccupiedByOpponent } from "./Generalrules.ts";

export const queenMove=(initialPosition:position,desiredPosition:position,team:TeamType,boardState:Piece[]):boolean=>{
    for(let i=1;i<8;i++){
        //Column same rows changing
        let multiplierX=(desiredPosition.x>initialPosition.x)?1:(desiredPosition.x<initialPosition.x)?-1:0;
        let multiplierY=(desiredPosition.y>initialPosition.y)?1:(desiredPosition.y<initialPosition.y)?-1:0;
        let passedPosition=new position(initialPosition.x+(i*multiplierX),initialPosition.y+(i*multiplierY));

        if(passedPosition.samePosition(desiredPosition)){
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
    return false;
} 

export const getPossibleQueenMoves=(queen:Piece,boardState:Piece[]):position[]=>{
    let possibleMoves:position[]=[];

    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x,queen.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x,queen.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x+i,queen.position.y);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x-i,queen.position.y);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }

    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x+i,queen.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x-i,queen.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x+i,queen.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<8;i++){
        const destination=new position(queen.position.x-i,queen.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,queen.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    return possibleMoves;
}