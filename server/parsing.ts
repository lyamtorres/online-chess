/* 
Separe la chaine rentrée par user dans la page web en IMove
*/

//Importation des modules necessaires
import {IMove} from "./interfaces";

export function parsing (coup: string): IMove {

	let userMove: IMove = {pieceName: "", column: 0, lign: 0, colour: true}; // Creation d'un coup initial random
	
	if(coup.charAt(1) >= 'a' && coup.charAt(1) <= 'z'){
		userMove.pieceName = coup.charAt(0) + coup.charAt(1); 
		userMove.column = coup.charCodeAt(2) - 65; // 65=codeAscii(A) Si char 2 est un A, colonne 0. 
		userMove.lign = coup.charCodeAt(3) - 49; // 49=codeAscii(1). Si char 3 est un 1, ligne 0. Decalage pour avoir numerotation tableau
	}else{
		userMove.pieceName = coup.charAt(0);
		userMove.column = coup.charCodeAt(1) - 65;
		userMove.lign = coup.charCodeAt(2) - 49;
	}
	return userMove;
}
