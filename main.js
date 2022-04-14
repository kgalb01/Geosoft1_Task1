/**
* Hausaufgabe 1 im Kurs Geosoftware 1, 11.04.2022
* Author: Kieran Galbraith, Martikelnummer: 453493
*/

"use strict"; //Frage: Warum sagt jshint das ist falsch?

// Dekleration der benötigten Variablen
var distance = new Array(); //Array der die jeweiligen Distanzen speichert

/**
* Funktion: calculateDistance
* Beschreibung: Die Funktion nimmt zwei Punkte im WGS84 Format entgegen
* und berechnet die Entfernung zwischen den Punkten
* Quelle der Berechnung: https://www.movable-type.co.uk/scripts/latlong.html
* Achtung! Lat/Lon sind vertauscht - also Punkte der Form  Lon/Lat angeben!
*/

function calculateDistance(point, city){
  //Variablen Deklaration
  var R; //Radius der Erde in Meter
  var phi1; //Phi und Lambda in Radianten
  var phi2;
  var deltaPhi;
  var deltaLambda;
  var a;
  var c;
  var d; //Das Ergebnis der Berechnung - also die die Distanz
  var pi; // Hilfsvariable

  pi = Math.PI;
  R = 6371e3; //Frage: Warum ist das R gelb?!
  phi1 = point[1] * pi/180; //Umrechnung zu Radianten
  phi2 = city[1] * pi/180;
  deltaPhi = ((city[1] - point[1]) * pi/180);
  deltaLambda = ((point[0] - city[0]) * pi/180);
  //Das folgende berechnet die "Haversine-Formel" Quelle: Siehe oben
  a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  d = R * c;
  d =  d/1000;
  return d.toFixed(3); //Gibt die Entfernung in Kilometer zurück, gerundet auf 3 Stellen
}

/**
* Funktion: addToDistance
* Beschreibung: Fügt mit Hilfe einer for-Schleife ALLE Distanzen in das
* distance Array
*/
function addToDistance(point, cities) {
  for (var i = 0; i < cities.length; i++) {
    distance[i] = calculateDistance(point, cities[i]);
  }
}

// Ausführen der Funktion
addToDistance(point, cities);

/**
* Funktion: ???
* Beschreibung: Nutzt die vorgefertigte .sort Funktion um das Array
* distance zu sortieren, in dem die Entfernungen stecken
* Quelle: W3Schools
*/
distance.sort(function(a,b) {
  return a-b;
  }
);

/**
* Funktion: addToTable
* Beschreibung: Fügt die (sortierten) Werte des Arrays distance in die Tabelle
* von index.html
*/
function addToTable() {
  var tableBody = document.getElementById('tableBody');
  var table = "";
  for (var i = 0; i < cities.length; i++){
    table = table + "<tr><td>" + cities[i] +
    "<td></td>" + "</td><td>" +
    distance[i] + "</td><td>";
  }
  tableBody.innerHTML = table;
}

//Ausführen der Funktion
addToTable();
