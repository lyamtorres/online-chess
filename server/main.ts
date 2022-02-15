/*
 Programme principal du serveur d'échecs en ligne
 */

// Importation des modules necessaires
import {parsing} from './parsing'
import {IMove, IPlateau} from './interfaces'
import {boardStartPosition} from './chessboard';
import {move} from './move';


// Imports des modules serveur web
import express = require('express');
import bodyParser = require('body-parser');
declare var __dirname;
const _PORT_ = 8080; // Port d'écoute du serveur
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/../client')); // Distribution automatique des fichiers (ex : index.html)


// Création d'une variable globale de la partie en cours
let echiquier: IPlateau = boardStartPosition(); 


//Fonction de traitement d'un coup envoyé par le navigateur
app.post("/",function(req, res) {
  let coup: string = req.body.coup; // Récupération du coup

  echiquier.alertText = "";
  let userMove: IMove = parsing(coup);
  echiquier = move(userMove,echiquier);
  res.redirect("/"); // On redirige l'utilisateur vers l'affichage du nouvel echiquier
});



//Fonction retournant l'échiquier actuel
app.get("/status.js", function(req, res) {
  res.end("var echiquier = "+JSON.stringify(echiquier));
});

//Lancement de l'application
app.listen(_PORT_, function () {
  console.log('Application lancée à l\'adresse http://localhost:'+_PORT_);
});