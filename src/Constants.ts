import { Piece } from "./models/Piece.ts";
import { position } from "./models/Position.ts";

export const verticalAxis=["1","2","3","4","5","6","7","8"];
export const horizontalAxis=["a","b","c","d","e","f","g","h"];
export const GRID_SIZE=100;

  export enum TeamType{
    OPPONENT,
    OUR
  }
  export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
  }

export const initialBoardState:Piece[]=[

    //Black Pieces
    //PAWN
    new Piece(new position(0,1),PieceType.PAWN,TeamType.OUR),
    new Piece(new position(1,1),PieceType.PAWN,TeamType.OUR),
    new Piece(new position(2,1),PieceType.PAWN,TeamType.OUR),
    new Piece(new position(3,1),PieceType.PAWN,TeamType.OUR),
    new Piece(new position(4,1),PieceType.PAWN,TeamType.OUR),
    new Piece(new position(5,1),PieceType.PAWN,TeamType.OUR),
    new Piece(new position(6,1),PieceType.PAWN,TeamType.OUR),
    new Piece(new position(7,1),PieceType.PAWN,TeamType.OUR),
   
    new Piece(new position(0,0),PieceType.ROOK,TeamType.OUR),
    new Piece(new position(1,0),PieceType.KNIGHT,TeamType.OUR),
    new Piece(new position(2,0),PieceType.BISHOP,TeamType.OUR),
    new Piece(new position(3,0),PieceType.KING,TeamType.OUR),
    new Piece(new position(4,0),PieceType.QUEEN,TeamType.OUR),
    new Piece(new position(5,0),PieceType.BISHOP,TeamType.OUR),
    new Piece(new position(6,0),PieceType.KNIGHT,TeamType.OUR),
    new Piece(new position(7,0),PieceType.ROOK,TeamType.OUR),

    new Piece(new position(0,6),PieceType.PAWN,TeamType.OPPONENT),
    new Piece(new position(1,6),PieceType.PAWN,TeamType.OPPONENT),
    new Piece(new position(2,6),PieceType.PAWN,TeamType.OPPONENT),
    new Piece(new position(3,6),PieceType.PAWN,TeamType.OPPONENT),
    new Piece(new position(4,6),PieceType.PAWN,TeamType.OPPONENT),
    new Piece(new position(5,6),PieceType.PAWN,TeamType.OPPONENT),
    new Piece(new position(6,6),PieceType.PAWN,TeamType.OPPONENT),
    new Piece(new position(7,6),PieceType.PAWN,TeamType.OPPONENT),

    new Piece(new position(0,7),PieceType.ROOK,TeamType.OPPONENT),
    new Piece(new position(1,7),PieceType.KNIGHT,TeamType.OPPONENT),
    new Piece(new position(2,7),PieceType.BISHOP,TeamType.OPPONENT),
    new Piece(new position(3,7),PieceType.QUEEN,TeamType.OPPONENT),
    new Piece(new position(4,7),PieceType.KING,TeamType.OPPONENT),
    new Piece(new position(5,7),PieceType.BISHOP,TeamType.OPPONENT),
    new Piece(new position(6,7),PieceType.KNIGHT,TeamType.OPPONENT),
    new Piece(new position(7,7),PieceType.ROOK,TeamType.OPPONENT)
    
];