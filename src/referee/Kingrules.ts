import { TeamType } from "../Constants.ts";
import { Piece } from "../models/Piece.ts";
import { position } from "../models/Position.ts";
import { tileIsOccupied,tileIsOccupiedByOpponent,tileIsEmptyOrOccupiedByOpponent } from "./Generalrules.ts";

export const kingMove=(initialPosition:position,desiredPosition:position,team:TeamType,boardState:Piece[]):boolean=>{
    let multiplierX=(desiredPosition.x>initialPosition.x)?1:(desiredPosition.x<initialPosition.x)?-1:0;
    let multiplierY=(desiredPosition.y>initialPosition.y)?1:(desiredPosition.y<initialPosition.y)?-1:0;

    let passedPosition=new position(initialPosition.x+(1*multiplierX),initialPosition.y+(1*multiplierY));
    if(passedPosition.samePosition(desiredPosition)){
            //dealing with destination tile
        if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
            return true;
        }
    }
    else{
        //dealing with passing tile
        if(tileIsOccupied(passedPosition,boardState)){
            return false;
        }
    }
    return false;    
}

export const getPossibleKingMoves=(king:Piece,boardState:Piece[]):position[]=>{
    let possibleMoves:position[]=[];

    for(let i=1;i<2;i++){
        const destination=new position(king.position.x,king.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<2;i++){
        const destination=new position(king.position.x,king.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<2;i++){
        const destination=new position(king.position.x+i,king.position.y);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<2;i++){
        const destination=new position(king.position.x-i,king.position.y);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }

    for(let i=1;i<2;i++){
        const destination=new position(king.position.x+i,king.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<2;i++){
        const destination=new position(king.position.x-i,king.position.y+i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<2;i++){
        const destination=new position(king.position.x+i,king.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    for(let i=1;i<2;i++){
        const destination=new position(king.position.x-i,king.position.y-i);
        if(!tileIsOccupied(destination,boardState)){
            possibleMoves.push(destination);
        }
        else if(tileIsOccupiedByOpponent(destination,boardState,king.team)){
            possibleMoves.push(destination);
            break;
        }
        else{
            break;
        }
    }
    return possibleMoves;
}