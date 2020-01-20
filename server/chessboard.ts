/*
Contient la liste des pieces
Creation de la variable echiquier en position initiale
*/


// Importation des modules necessaires
import {IPiece, IPlateau} from "./interfaces";

export function emptySpace () : IPiece {
  let pieceVoid: IPiece = {name: "void", picture: " ", colour: true, posX: 1, posY: 1};
  return pieceVoid;
  }
  
// Creation de l'echiquier initial
export function boardStartPosition () : IPlateau {

  // Création de l'échiquier
  let chessBoard : IPlateau = {position: [], nbMove:0, alertText: ""};
  let pieceVoid: IPiece = emptySpace();

  // Création et remplissage de pièces vides
  let i, j: number;

  for(i = 0; i < 8; i++){
    chessBoard.position.push([]);
    for(j = 0; j < 8; j++){
      chessBoard.position[i].push(pieceVoid);
    }
  }

  //Initialisation des 16 pièces maitresses
  let pieces: Array<IPiece> = [
    {name: "Ta", picture: "whiteRook.png", colour: true, posX: 1,posY: 1},
    {name: "Th", picture: "whiteRook.png", colour: true, posX: 8,posY: 1},
    {name: "Ta", picture: "blackRook.png", colour: false, posX: 1,posY: 8},
    {name: "Th", picture: "blackRook.png", colour: false, posX: 8,posY: 8},
    
    {name: "R", picture: "whiteKing.png", colour: true, posX: 4, posY: 1},
    {name: "R", picture: "blackKing.png", colour: false, posX: 5, posY: 8},
    {name: "D", picture: "whiteQueen.png", colour: true, posX: 5, posY: 1},
    {name: "D", picture: "blackQueen.png", colour: false, posX: 4, posY: 8},
    
    {name: "Cb", picture: "whiteKnight.png", colour: true, posX: 2, posY: 1},
    {name: "Cg", picture: "whiteKnight.png", colour: true, posX: 7, posY: 1},
    {name: "Cb", picture: "blackKnight.png", colour: false, posX: 2, posY: 8},
    {name: "Cg", picture: "blackKnight.png", colour: false, posX: 7, posY: 8},
    
    {name: "Fc", picture: "whiteBishop.png", colour: true, posX: 3, posY: 1},
    {name: "Ff", picture: "whiteBishop.png", colour: true, posX: 6, posY: 1},
    {name: "Fc", picture: "blackBishop.png", colour: false, posX: 3, posY: 8},
    {name: "Ff", picture: "blackBishop.png", colour: false, posX: 6, posY: 8}
  ];

  // Initialisation des pions par une boucle
  let columns: Array<string> = ["a","b","c","d","e","f","g","h"];
  for(i = 1; i <= 8; i++){
    pieces.push({name: "P" + columns[i-1], picture: "whitePawn.png", colour: true, posX: i, posY: 2});
    pieces.push({name: "P" + columns[i-1], picture: "blackPawn.png", colour: false, posX: i, posY: 7});
  }

  // Ajout de toutes les pièces dans l'échiquier
  for(i = 0; i < pieces.length; i++){
    chessBoard.position[pieces[i].posX-1][pieces[i].posY-1] = pieces[i];
  }
  return chessBoard;
 }

