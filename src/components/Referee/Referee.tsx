import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { PieceType, TeamType,initialBoardState} from '../../Constants.ts';
import ChessBoard from '../chessboard/ChessBoard.tsx';
import { getPossiblePawnMoves, pawnMove } from '../../referee/Pawnrules.ts';
import { getPossibleKnightMoves, knightMove } from '../../referee/Knightrules.ts';
import { bishopMove, getPossibleBishopMoves } from '../../referee/Bishoprules.ts';
import { getPossibleRookMoves, rookMove } from '../../referee/Rookrules.ts';
import { getPossibleQueenMoves, queenMove } from '../../referee/Queenrules.ts';
import { getPossibleKingMoves, kingMove } from '../../referee/Kingrules.ts';
import { Piece } from '../../models/Piece.ts';
import { position } from '../../models/Position.ts';

export default function Referee() {
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const modalRef=useRef<HTMLDivElement>(null);
    const [promotingPawn,setPromotingPawn]=useState<Piece>();

    useEffect(()=>{
        updatePossibleMoves();
    },[])

    function updatePossibleMoves(){
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = getValidMoves(p, currentPieces);
                return p;
            });
        })
    }

  
    function playMove(playedPiece: Piece, destination: position): boolean {
        const validMove = isValidMove(playedPiece.position, destination, playedPiece.type, playedPiece.team);

        //Reduce Function
        //Results => Array of results
        //Piece=>a single object from the initial array

        /*const enPassantMove = isEnPassantMove(
            playedPiece.position, destination, playedPiece.type, playedPiece.team
        );
        const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

        if (enPassantMove) {
            const updatedPieces = pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    //piece.enPassant = false;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    results.push(piece);
                }
                else if (!piece.samePosition(new position(destination.x, destination.y - pawnDirection ))) {
                    if (piece.type === PieceType.PAWN) {
                       // piece.enPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);
            updatePossibleMoves();
            setPieces(updatedPieces);
        }
        else*/ if (validMove) {
            //Updates the piece position
            //Remove a piece attacked
            const updatedPieces = pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    //piece.enPassant = Math.abs(playedPiece.position.y - destination.y) === 2 && piece.type === PieceType.PAWN;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    let promotionRaw = (piece.team === TeamType.OUR) ? 7 : 0;

                    if (destination.y === promotionRaw && piece.type === PieceType.PAWN) {
                        modalRef.current?.classList.remove("hidden");
                        setPromotingPawn(piece);
                    }
                    results.push(piece);
                }

                else if ((!piece.samePosition(new position(destination.x,destination.y)))){
                    if (piece.type === PieceType.PAWN) {
                       // piece.enPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);
            updatePossibleMoves();
            setPieces(updatedPieces);
        }
        else {
            return false;

        } return true;
    }

    /*function isEnPassantMove(initialPosition: position, desiredPosition: position, type: PieceType, team: TeamType) {
        const pawnDirection = (team === TeamType.OUR) ? 1 : -1;
        if (type === PieceType.PAWN) {
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = pieces.find((p) => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant);
                if (piece) {
                    return true;
                }
            }
        }
        return false;
    }*/

    function isValidMove(initialPosition: position, desiredPosition: position, type: PieceType, team: TeamType) {
        let validMove = false;
        switch (type) {
            case PieceType.PAWN:
                validMove = pawnMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.KNIGHT:
                validMove = knightMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.BISHOP:
                validMove = bishopMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.ROOK:
                validMove = rookMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.QUEEN:
                validMove = queenMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.KING:
                validMove = kingMove(initialPosition, desiredPosition, team, pieces);
                break;
        }
        return validMove;
    }

    function getValidMoves(piece: Piece, pieces: Piece[]): position[] {
        switch (piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, pieces);

            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, pieces);

            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, pieces);

            case PieceType.ROOK:
                return getPossibleRookMoves(piece, pieces);

            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, pieces);

            case PieceType.KING:
                return getPossibleKingMoves(piece, pieces);
            default:
                return [];
        }

    }

    
  function promotePawn(type:PieceType){
    if(promotingPawn===undefined){
      return;
    }
   const updatedPieces=pieces.reduce((results,piece)=>{
    if(piece.samePiecePosition(promotingPawn)){
      piece.type=type;
      const teamType=(piece.team===TeamType.OUR)?"b":"w";
      let image="";
      switch(type){
        case PieceType.ROOK:{
          image="r";
          break;
        }
        case PieceType.KNIGHT:{
          image="n";
          break;
        }
        case PieceType.BISHOP:{
          image="b";
          break;
        }
        case PieceType.QUEEN:{
          image="q";
          break;
        }
      }
      piece.image=`${teamType}${image}.png`;
    }
    results.push(piece);
    return results;
   },
   [] as Piece[])
   updatePossibleMoves();
   setPieces(updatedPieces);
   modalRef.current?.classList.add("hidden");
  }

  function promotingTeam(){
    if(promotingPawn)  
    return (promotingPawn.team===TeamType.OUR)?"b":"w";
  }


    return (<>
        <div id="pawn-promotion" className="hidden" ref={modalRef}>
            <div id="model">
                <img onClick={() => promotePawn(PieceType.ROOK)} src={`${promotingTeam()}r.png`}></img>
                <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`${promotingTeam()}n.png`}></img>
                <img onClick={() => promotePawn(PieceType.BISHOP)} src={`${promotingTeam()}b.png`}></img>
                <img onClick={() => promotePawn(PieceType.QUEEN)} src={`${promotingTeam()}q.png`}></img>
            </div>
        </div>
        <ChessBoard  playMove={playMove} pieces={pieces} /></>);
}