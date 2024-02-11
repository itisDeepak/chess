import { PieceType, TeamType } from "../Constants";
import { Piece } from "./Piece";
import { position } from "./Position";

export class Pawn extends Piece{
    enPassant?:boolean;
    constructor(position:position,team:TeamType){
        super(position,PieceType.PAWN,team);

    }
}