import { PieceType, TeamType } from "../Constants.ts";
import { position } from "./Position.ts";

export class Piece {
    image: string;
    position: position;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
    possibleMoves?: position[];
    constructor( position: position, type: PieceType, team: TeamType) {
        let teamtype=team===TeamType.OUR?"b":"w";
        let piecetype;
        switch(type){
            case PieceType.PAWN:piecetype="p";
                break;
            case PieceType.ROOK:piecetype="r";
                break;
            case PieceType.KNIGHT:piecetype="n";
                break;
            case PieceType.BISHOP:piecetype="b";
                break;
            case PieceType.QUEEN:piecetype="q";
                break;
            case PieceType.KING:piecetype="k";
                break;
        }
        this.image = `${teamtype}${piecetype}.png`;
        this.position = position;
        this.type = type;
        this.team = team;
    }

    samePiecePosition(otherPiece:Piece){
        return this.position.samePosition(otherPiece.position);
    }
    samePosition(otherPosition:position){
        return this.position.samePosition(otherPosition);
    }
}
