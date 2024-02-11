import { TeamType } from "../Constants.ts";
import { Piece } from "../models/Piece.ts";
import { position } from "../models/Position.ts";
import { tileIsOccupied,tileIsOccupiedByOpponent } from "./Generalrules.ts";


export const pawnMove=(initialPosition:position,desiredPosition:position,team:TeamType,boardState:Piece[]):boolean=>{
    const specialRow=(team===TeamType.OUR)?1:6;
    const pawnDirection=(team===TeamType.OUR)?1:-1;

    if(initialPosition.x===desiredPosition.x && initialPosition.y===specialRow && desiredPosition.y-initialPosition.y===2*pawnDirection){
        if(!tileIsOccupied(desiredPosition,boardState) && !tileIsOccupied(new position(desiredPosition.x,desiredPosition.y-pawnDirection),boardState)){
            return true;
        }
    }else if(initialPosition.x===desiredPosition.x &&desiredPosition.y-initialPosition.y ===pawnDirection){
        if(!tileIsOccupied(desiredPosition,boardState)){
            return true;
        }
    }
    
    //ATTACKING LOGIC
    else if(desiredPosition.x-initialPosition.x===-1 && desiredPosition.y-initialPosition.y===pawnDirection){
        
        if(tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
            return true;
        }console.log("upper/bottom left");
    }
    else if(desiredPosition.x-initialPosition.x===1 && desiredPosition.y-initialPosition.y===pawnDirection){
        
        if(tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
            return true;
        }console.log("upper/bottom right");
    }return false;
}

export const getPossiblePawnMoves=(pawn:Piece,boardState:Piece[]):position[]=>{
    const possibleMoves:position[]=[];
    const specialRow=(pawn.team===TeamType.OUR)?1:6;
    const pawnDirection=pawn.team===TeamType.OUR?1:-1;

    const normalMove=new position(pawn.position.x,pawn.position.y+pawnDirection);
    const specialMove=new position(pawn.position.x,pawn.position.y+pawnDirection*2);
    const upperRightAttack=new position(pawn.position.x+1,pawn.position.y+pawnDirection);
    const upperLeftAttack=new position(pawn.position.x-1,pawn.position.y+pawnDirection);
    const leftPosition=new position(pawn.position.x-1,pawn.position.y);
    const rightPosition=new position(pawn.position.x+1,pawn.position.y);
    if(!tileIsOccupied(normalMove,boardState)){
        possibleMoves.push(normalMove);
        if(pawn.position.y===specialRow && !tileIsOccupied(specialMove,boardState)){
            possibleMoves.push(specialMove);
        }
    }
    if(tileIsOccupiedByOpponent(upperRightAttack,boardState,pawn.team)){
        possibleMoves.push(upperRightAttack)
    }
    else if(!tileIsOccupied(upperRightAttack,boardState)){
        const rightPiece=boardState.find(p=>p.samePosition(rightPosition));
        if(rightPiece!=null && rightPiece.team===TeamType.OPPONENT&& rightPiece?.enPassant){
            possibleMoves.push(upperRightAttack);
        }
    }
    if(tileIsOccupiedByOpponent(upperLeftAttack,boardState,pawn.team)){
        possibleMoves.push(upperLeftAttack)
    }
    else if(!tileIsOccupied(upperLeftAttack,boardState)){
        const leftPiece=boardState.find(p=>p.samePosition(leftPosition));
        if(leftPiece!=null && leftPiece.team===TeamType.OPPONENT&& leftPiece?.enPassant){
            possibleMoves.push(upperLeftAttack);
        }
    }
    return possibleMoves; 
}