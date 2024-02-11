// ChessBoard.jsx

import React from 'react';
import { useState } from 'react';
import './ChessBoard.css'; 
import Tile from '../Tile/Tile.tsx';
import {useRef} from 'react';
import {GRID_SIZE} from '../../Constants.ts';
import { position } from '../../models/Position.ts';
import { Piece } from '../../models/Piece.ts';

interface Props{
  playMove:(piece:Piece,position:position)=>boolean;
  pieces:Piece[];
}

export default function Chessboard({playMove,pieces}:Props){
  const [activePiece,setActivePiece]=useState<HTMLElement|null>(null);
  const [grabPosition,setGrabPosition]=useState<position>(new position(-1,-1));
  let chessboardRef = useRef<HTMLDivElement>(null);
  

function grabPiece(e:React.MouseEvent){ 
  const element=e.target as HTMLElement;
  const chessboard=chessboardRef.current;
  if(element.classList.contains("chess-piece") && chessboard){
    const grabX=Math.floor((e.clientX-chessboard.offsetLeft)/80);
    const grabY=Math.abs(Math.ceil((e.clientY-chessboard.offsetTop-640)/80));
    setGrabPosition(new position(grabX,grabY));
    const x=e.clientX-GRID_SIZE/2;
    const y=e.clientY-GRID_SIZE/2;
    element.style.position="absolute";
    element.style.left=`${x}px`;
    element.style.top=`${y}px`;

    setActivePiece(element);
  }

}


function movepiece(e:React.MouseEvent){
  const chessboard=chessboardRef.current;
  
  if(activePiece && chessboard){
    
    const minx=chessboard.offsetLeft-25;
    const miny=chessboard.offsetTop-25;
    const maxx=chessboard.offsetLeft+chessboard.clientWidth-75;
    const maxy=chessboard.offsetTop+chessboard.clientHeight-75;
    const x=e.clientX-50;
    const y=e.clientY-50; 
    activePiece.style.position="absolute";
    if(x<minx){
      activePiece.style.left=`${minx}px`;
    }
    else if(x>maxx){
      activePiece.style.left=`${maxx}px`
    }else{
      activePiece.style.left=`${x}px`;
    }
    if(y<miny){
      activePiece.style.top=`${miny}px`;
    }
    else if(y>maxy){
      activePiece.style.top=`${maxy}px`
    }else{
      activePiece.style.top=`${y}px`;
    }
    
  }
}

function dropPiece(e:React.MouseEvent){
  const chessboard=chessboardRef.current;
  
  if(activePiece && chessboard){
    const x=Math.floor((e.clientX-chessboard.offsetLeft)/80);
    const y=Math.abs(Math.ceil((e.clientY-chessboard.offsetTop-640)/80));

   const currentPiece=pieces.find((p)=>p.samePosition(grabPosition));

   if(currentPiece){
    var success=playMove(currentPiece,new position(x,y));
    if(!success){
      activePiece.style.position='relative';
      activePiece.style.removeProperty('top');
      activePiece.style.removeProperty('left');
    }
   }
   setActivePiece(null);

   }
  }

  let board=[];

  for(let j=7;j>=0;j--){
    for(let i=0;i<8;i++){
      const number=i+j+2;
      const piece=pieces.find((p)=>p.samePosition(new position(i,j)));
      let image=piece?piece.image:undefined;
      
      let currentPiece=(activePiece!=null)?pieces.find(p=>p.samePosition(grabPosition)):undefined;
      let highlight=currentPiece?.possibleMoves?currentPiece.possibleMoves.some(p=>p.samePosition(new position(i,j))):false;
      // @ts-ignore
     board.push( <Tile key={`${j},${i}`}image={image} number={number} highlight={highlight}/> );
    }
}


return (<>
   
        <div id="chessboard" 
        onMouseMove ={(e)=>movepiece(e)} 
        onMouseDown={(e)=>grabPiece(e)}
        onMouseUp={(e)=>dropPiece(e)}
        ref={chessboardRef}
        >{board}</div></>
);
}
