/*
 * Fonction principale executée après le chargement de la page
 * Initialise l'échiquier en fonction de la variable "echiquier"
 */

function init(){

	for(var i=0;i<echiquier.position.length;i++){
		for(var j=0;j<echiquier.position.length;j++){
			var piece = echiquier.position[i][j];
			if(piece.name=="void"){
				//Vidage de la case
				document.getElementsByTagName("tr")[j+1].getElementsByTagName("td")[i].innerHTML="";
			}else{
				//Affichage de l'image
				document.getElementsByTagName("tr")[j+1].getElementsByTagName("td")[i].title = piece.name; 
				document.getElementsByTagName("tr")[j+1].getElementsByTagName("td")[i].innerHTML="<img src=\"images/"+piece.picture+"\"/>"; //version image
			}
		}
	}
	if(echiquier.alertText != ""){ //Si mauvais coup, si un joueur a gagne, si un pion n'existe pas
		alert(echiquier.alertText);
	}
} 