/*
Interfaces necessaires au deroulement du jeu 
*/


// Importation des modules necessaires
import {emptySpace} from "./chessboard";

export let noPieceLocated : IPiece = emptySpace();

export interface IPiece {
    name: string;
    picture: string;
    colour: boolean; //True: white, False: black
    posX: number;
    posY: number;
}

export interface IMove {
    pieceName: string;
    column: number;
    lign: number;
    colour: boolean;
}

export interface IPlateau {
    position: Array<Array<IPiece>>;
    nbMove: number;
    alertText: string;
}


