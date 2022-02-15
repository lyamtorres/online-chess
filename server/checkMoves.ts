/*
Fonctions qui vérifient tous les deplacements possibles de chaque piece
*/


// Importation des modules necessaires
import {IPiece, IMove, IPlateau} from "./interfaces";
import {noPieceLocated} from "./interfaces";

// Verifie que le coup est bien dans le plateau
export function checkMove(startColumn: number, startLign: number, userMove: IMove, plate: IPlateau): boolean {
	if(plate.position[userMove.column][userMove.lign].colour == 
	userMove.colour && plate.position[userMove.column][userMove.lign].name != 'void'){ // Ne peut pas manger un pion de sa couleur
		return false;
	}
	if(startColumn >= 0 && startColumn <= 7 && startLign >= 0 && startLign <= 7 &&
	userMove.column >= 0 && userMove.column<=7 && userMove.lign>=0 && userMove.lign<=7) {
		return true;
	}else{
		return false;
	}
}

// Verifie si le roi adverse vient d'être mange le premier
export function checkEnd(userMove: IMove, plate: IPlateau): boolean {
	
	let kingPresence: boolean = false;
	let theEnd: boolean = false;
	let col: number = 0;
	let line: number = 0;
	if(plate.position[userMove.column][userMove.lign].name == "R" && 
	plate.position[userMove.column][userMove.lign].colour != userMove.colour) {
		theEnd = true;
	}
	return theEnd;
}


//Verifie qu'un mouvement en croix horizontal et vertical est bien exécuté
export function checkMoveCross(startColumn: number, startLign: number, userMove: IMove, plate: IPlateau): boolean {

	let feasableMove: boolean;

	if(userMove.column == startColumn) {
		if(startLign < userMove.lign) { // Deplacement vertical
		for(let i: number = startLign + 1; i < userMove.lign; i++) {
			if(plate.position[userMove.column][i].name == 'void') { // Verification si aucune piece presente sur le trajet
				feasableMove = true;
			} else {
				return false;
			}
		}
	} else {
		for(let i: number = userMove.lign + 1; i < startLign; i++) {
			// Verification si aucune piece presente sur le trajet
			if(plate.position[userMove.column][i].name=='void') { 
				feasableMove = true;
			} else {
				return false;
			}
		}
	}
	} else if (userMove.lign == startLign) { // Deplacement horizontal
		for(let i: number = startColumn + 1; i < userMove.column; i++) {
			if(plate.position[i][userMove.lign].name == 'void') {
				feasableMove = true;
			} else {
				return false;
			}
		}
	} else {
		return false;
	}
	return feasableMove;
}
	
	
// Verifie qu'un mouvement en diagonal haut/bas/gauche/droite est bien exécuté
export function checkMoveDiag(startColumn: number, startLign: number, userMove: IMove, plate: IPlateau): boolean {

	let feasableMove: boolean;
	 
	//Deplacement dune case en diagonal
	if(Math.abs(userMove.column - startColumn) == 1 && Math.abs(userMove.lign - startLign) == 1) { 
		return true;
	}
	if(Math.abs(userMove.column - startColumn) == Math.abs(userMove.lign-startLign)) { // Deplacement diagonal

		let column: number = startColumn;
		let lign: number = startLign;
		
		if(startColumn < userMove.column) { // Deplacement a droite
			if(startLign > userMove.lign) { // Deplacement en haut
				while(column != userMove.column -1 && lign != userMove.lign + 1) {
					// Verification si piece presente sur le trajet
					if(plate.position[column+1][lign-1].name == 'void'){ 
						feasableMove = true;
					} else {
						return false;
					}
				column++;
				lign = lign - 1;
				}
			} else if(startLign < userMove.lign){ // Déplacement en bas
				while(column != userMove.column -1 && lign != userMove.lign - 1) {
					if(plate.position[column + 1][lign + 1].name == 'void'){ // Vérification si pièce est présente sur le trajet
						feasableMove = true;
					} else {
						return false;
					}
				column++;
				lign++;
				}
			}
		}
		if(startColumn > userMove.column) { //Déplacement a gauche
			if(startLign>userMove.lign){ //Déplacement en haut
				while(column != userMove.column + 1 && lign != userMove.lign + 1) { // +1 et -1 pour ne pas regarder case arrivee
					if(plate.position[column-1][lign-1].name=='void'){ //Verification si piece presente sur le trajet en evitant case depart
						feasableMove = true;
					} else {
						return false;
					}
				column=column - 1;
				lign = lign - 1;
				}
			} else if(startLign < userMove.lign) { // Déplacement en bas
				while(column != userMove.column + 1 && lign != userMove.lign -1 ) { //+1 et -1 pour ne pas regarder case arrivee
					if(plate.position[column - 1][lign + 1].name == 'void') { // Vérification si pièce présente sur le trajet en évitant case départ
						feasableMove = true;
					}else{
						return false;
					}
				column = column - 1;
				lign++;
				}
			}
		}
	} else {
		return false;
	}
	return feasableMove;
}
	

//Verifie le mouvement dun cavalier
export function checkMoveKnight(startColumn: number, startLign: number, userMove: IMove): boolean {
	if(((userMove.column == startColumn + 1 || userMove.column == startColumn - 1) && (userMove.lign == startLign + 2 || userMove.lign == startLign - 2)) 
	|| ((userMove.column == startColumn + 2 || userMove.column == startColumn - 2) && (userMove.lign == startLign + 1 || userMove.lign == startLign - 1))) {
		return true;
	} else {
		return false;
		}
}


//Verifie le mouvement d'un pion
export function checkMovePawn(startColumn: number, startLign: number, userMove: IMove, plate: IPlateau): boolean {
	if(!userMove.colour){//Pion noir
		if(plate.position[userMove.column][userMove.lign].name == 'void') {// Si l'emplacement d'arrivée est vide
			//Si deplacement vertical ET si depart, deplacement uniquement 1 ou 2 lignes OU non depart et deplacement 1 ligne seulement
			if(userMove.column == startColumn && (startLign == 6 && 
			(userMove.lign == startLign - 1 || userMove.lign == startLign - 2)) 
			|| (startLign!=6 && userMove.lign==startLign-1)) {
				return true;
			} else {
				return false;
			}
		} else { // Emplacement non vide, prise de pion
			if((userMove.column == startColumn + 1 || userMove.column==startColumn-1) 
			&& (userMove.lign == startLign + 1 || userMove.lign == startLign - 1)) {
				return true;
			} else {
				return false;
			}
		}		
	} else { //Pion blanc
		if(plate.position[userMove.column][userMove.lign].name == 'void') { // Si l'emplacement d'arrivee est vide
			//Si deplacement vertical ET si depart, deplacement uniquement 1 ou 2 lignes OU non depart et deplacement 1 ligne seulement
			if(userMove.column == startColumn && (startLign == 1 && (userMove.lign == startLign + 1 
				|| userMove.lign == startLign + 2)) || (startLign != 1 && userMove.lign == startLign + 1)) {
				return true;
			} else {
				return false;
			}
		} else { // Emplacement non vide, prise de pion
			if((userMove.column == startColumn + 1 || userMove.column == startColumn - 1) 
			&& (userMove.lign == startLign + 1 || userMove.lign == startLign - 1)) {
				return true;
			} else {
				return false;
			}
		}
	}	
}
	

// Vérifie le mouvement d'une tour
export function checkMoveRook(startColumn: number, startLign: number, userMove: IMove, plate: IPlateau): boolean {
	return checkMoveCross(startColumn, startLign, userMove, plate);
}


// Vérifie le mouvement d'un fou
export function checkMoveBishop(startColumn: number, startLign: number, userMove: IMove, plate: IPlateau): boolean { 
	return checkMoveDiag(startColumn, startLign, userMove, plate);
}


// Vérifie le mouvement d'une dame
export function checkMoveQueen(startColumn: number, startLign: number, userMove: IMove, plate: IPlateau): boolean { 
	// Peut se déplacer en diagonal, horizontal, vertical, aucune pièce sur son chemin
	if(userMove.column == startColumn || userMove.lign == startLign){ // Déplacement horizontal ou vertical
		return checkMoveCross(startColumn, startLign, userMove, plate);
	}else{//Deplacement autre 
		return checkMoveDiag(startColumn, startLign, userMove, plate);
	}
}


//Verifie le mouvement d'un roi
export function checkMoveKing(startColumn: number, startLign: number, userMove: IMove): boolean {
	if((startColumn == userMove.column + 1 && (startLign == userMove.lign - 1 
	|| startLign == userMove.lign + 1 || startLign == userMove.lign)) // Déplacement sur colonne de droite
	|| (startColumn == userMove.column && (startLign == userMove.lign+1 
	|| startLign == userMove.lign - 1)) // Déplacement sur meme colonne
	|| (startColumn == userMove.column - 1 && (startLign == userMove.lign - 1 
	|| startLign == userMove.lign + 1 || startLign == userMove.lign))) { // Déplacement sur colonne de gauche
		return true;
	} else {
		return false;
	}
}