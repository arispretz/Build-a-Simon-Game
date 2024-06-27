"use strict";

let tileBoard = ["red", "blue", "yellow", "green"];

let tileColors = {red: "#f22618", blue: "#2980b6", yellow: "#f1c42f", green: "#2ecc89"};

let audio = {
	red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), 
	blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"), 
	yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"), 
	green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

let currentCompSeries = [];

let userSeries = [];

let counter = 0;

let gameMove;

let strictMode = false; 


function playMove(tile) {
	document.getElementById(tile).style.backgroundColor = tileColors[tile];
	audio[tile].play();
	setTimeout(() => { 
		document.getElementById(tile).style.backgroundColor = "#f6f6f6";
	}, 500);
}


function newGame() {
	currentCompSeries = [];
	if (gameMove) clearInterval(gameMove);
	setTimeout(() => {
		document.getElementById("count").innerHTML = "--";
		compMove();
	}, 1000);
}

function compMove(moveSeries, next) {
	counter = 0;
	userSeries = [];
	if (moveSeries) {
		let index = 0;

		gameMove = setInterval(() => {
			let tile = moveSeries[index];
			playMove(tile);	

			index++;

			if (index >= moveSeries.length) {
				clearInterval(gameMove);
				if (next == "extra move"){
					setTimeout(() => compMove(), 700);
				}
			}				
		}, 700);
	} 
	else {
		let randomMove = Math.floor(Math.random()*4);
		let tile = tileBoard[randomMove];
		
		playMove(tile);

		currentCompSeries.push(tile);
	}	
}


function userMove(tile) {
	userSeries.push(tile);

	if (currentCompSeries[counter] == userSeries[counter]) {
		playMove(tile);
		counter++;
	} else {
		message("wrong-move");
		
		if (strictMode == true)	return newGame();

		compMove(currentCompSeries);
	}
	
	if (userSeries.toString() == currentCompSeries.toString()) {
		counter = counter < 10 ? "0" + counter : counter; 
		document.getElementById("count").innerHTML = counter;

		if (counter < 20) {
			setTimeout(() => compMove(currentCompSeries, "extra move"), 700);
		} else {
			message("victory");
		}
	}
}	

function message(element) {
	document.getElementById(element).className = "show-message";
	setTimeout(() => {
		document.getElementById(element).className = "hide-message";
		if (element == "victory") return newGame();
	}, 1500);
}


function toggleStrict(){
	strictMode = !strictMode;
	document.getElementById("strict").style.backgroundColor = strictMode ? "#8e44ad" : "#e4f1fe";
}
