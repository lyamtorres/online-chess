/* 
Déplace la piece saisie par l'user dans sa prochaine case 
*/

// Importation des modules necessaires
import {IPiece, IMove, IPlateau, noPieceLocated} from "./interfaces";
import {checkMove,checkMoveBishop, checkMoveKing, checkMoveKnight, checkMovePawn, checkMoveQueen, checkMoveRook, checkEnd} from "./checkMoves";

// Fonction qui permet le déplacement d'une piece en vérifiant la validité du coup
export function move(userMove: IMove, plate: IPlateau): IPlateau {

	let playerName: string;

	if(userMove.colour == true) {
		playerName = "L'Armée de Dumbledore";	
		} else {
			playerName = "Les Ténèbres";
		}
	if(plate.nbMove%2 == 0){
		userMove.colour = true; // Blanc
	} else {
		userMove.colour = false; // Noir
	}
	let xFound : number = -1;
	let yFound : number = -1;
	
	//Parcourt les colonnes
	for(let i: number = 0; i < plate.position.length; i++) {  

		for(let j: number = 0; j < plate.position.length; j++) { //Parcourt les lignes
			// Si la piece est non vide et de même nom que celle a deplacer
			
			if(plate.position[i][j] != noPieceLocated && plate.position[i][j].name == userMove.pieceName 
				// Si la couleur de la piece correspond a la couleur de la piece a deplacer
				 && plate.position[i][j].colour == userMove.colour) { 
				// Position de la piece a deplacer 
				xFound = i; 
				yFound = j; 
			}
		}
	}
	// Validité du coup dans le plateau 
	if(checkMove(xFound, yFound, userMove, plate)) {  
		if((userMove.pieceName.charAt(0) == 'C' && checkMoveKnight(xFound, yFound, userMove))
		|| (userMove.pieceName.charAt(0) == 'R' && checkMoveKing(xFound, yFound, userMove))
		|| (userMove.pieceName.charAt(0) == 'P' && checkMovePawn(xFound, yFound, userMove, plate))
		|| (userMove.pieceName.charAt(0) == 'T' && checkMoveRook(xFound, yFound, userMove, plate))
		|| (userMove.pieceName.charAt(0) == 'F' && checkMoveBishop(xFound, yFound, userMove, plate))
		|| (userMove.pieceName.charAt(0) == 'D' && checkMoveQueen(xFound, yFound, userMove, plate))){
			
			if(checkEnd(userMove, plate)) {
				plate.alertText = "Avada Kedavra ! " + playerName + " vient de gagner ! Vous pouvez continuer à jouer mais cela ne sert à rien...";
			}

			plate.position[userMove.column][userMove.lign] = plate.position[xFound][yFound]; // La case de destination se remplit avec la pièce à déplacer
			plate.position[userMove.column][userMove.lign].posX = userMove.column; // Actualisation de la column de la piece déplacée
			plate.position[userMove.column][userMove.lign].posY = userMove.lign; // Actualisation de la ligne de la piece deplacee
			plate.position[xFound][yFound] = noPieceLocated; // La case de départ se vide
			
			plate.nbMove++; 
		} else {
			plate.alertText = "Mauvais coup. " + playerName + ", veuillez rejouer.";
		}
	}
	if(xFound == -1 && yFound == -1){
		plate.alertText = "La piece n'existe pas/plus. " + playerName + ", veuillez rejouer une autre pièce.";
	}
	// Le nouveau plate modifié se range dans plateauAprèsCoup
	let plateauApresCoup: IPlateau = plate; 
	return plateauApresCoup;
}
