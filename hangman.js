/*var size= 70;
var name;*/
var game = new Game();
var player = new Player();
//*********************Game Class*****************************
function Game() {
	this.players = [];
	this.opportunities = 7;
	this.correctGuesses = {
		indexes : [],
		letter: ""
	}
}
//Adds player to players array from class Game
Game.prototype.addPlayer = function(player) {
	this.players.push(player);
}
//Returns the elements of players array
Game.prototype.getPlayer = function() {
	for (i in this.players) {
		return this.players[i];
	}
}
//Compares the letter guess iterating the phrase to guess
Game.prototype.compareWords = function() {
    var guessArray = player.getGuess();
    var phraseArray = player.getPhrase().split("");
    for (i in phraseArray) {
    	if (guessArray == phraseArray[i]) {
    		return true;
    	}
    }
}
//Check the left attemps and call the methos to draw the body parts
Game.prototype.checkAttemps = function() {
	if (game.compareWords() != true) {
		
		this.opportunities -= 1;
		switch (this.opportunities) {
			case 6:
			    drawHead();
			    break;
			case 5:
			    drawBody();
			    break;
			case 4:
			    drawRightArm();
			    break;
			case 3:
			    drawLeftArm();
			    break;
			case 2:
			    drawRightLeg();
			    break;
			case 1: 
			    drawLeftLeg();
			    alert("You loseeer!!!");
			    break
		
	    }
	}
}
//Set the correct guess to the objetc correctGuesses
Game.prototype.setCorrectPositions = function() {
	if (game.compareWords()) {
		for (i in player.getPhrase()) {
			if (player.getGuess()==player.getPhrase()[i]) {
				this.correctGuesses.letter = player.getPhrase()[i];
				this.correctGuesses.indexes.push(i);

			}
		}

	}
}
//Write the correctLetterGuess
Game.prototype.drawLetter = function() {
	for (i in player.getPhrase()) {
		console.log("funciona");
		var blanks = document.getElementsByClassName("blanks")[i];
		if ((blanks.getAttribute("id") == game.getCorrectLetter().toString()) && (blanks.childNodes.length == 0)) {
			text = document.createTextNode(game.getCorrectLetter().toString());
			blanks.appendChild(text);
		}
	}
}

Game.prototype.getCorrectPositions = function() {
	console.log(this.correctGuesses.letter + "  **  " + this.correctGuesses.indexes);

}
//Returns left opportunities
Game.prototype.getLeftOpportunities = function() {
	return this.opportunities;
}
//Returns the correctLetter
Game.prototype.getCorrectLetter = function() {
	return this.correctGuesses.letter;
}
//Draw the blanks for the phrase to guess
Game.prototype.drawPhrase = function() {
	var orderNumber=1;
	var spanNumber = 0;
	var margin = 0;
	var width = 1454.2;
	var spanWidth = 40;
	for (i in player.getPhrase()) {
		if (player.getPhrase()[i] != " ") {
		    var element = document.createElement("span");
		    var node = document.getElementsByClassName("draw-phrase")[0];
		    element.setAttribute("class","blanks");
		    element.setAttribute("id",player.getPhrase()[i].toString());
		    element.style.order=orderNumber.toString();
		    node.appendChild(element);
		    orderNumber ++;
		    spanNumber ++;
		    console.log(player.getPhrase()[i]);
	    }else {
	    	var element = document.createElement("span");
	    	var node = document.getElementsByClassName("draw-phrase")[0];
	    	element.setAttribute("class","blanks");
	    	element.setAttribute("id","spaces");
	    	element.style.order = orderNumber.toString();
	    	node.appendChild(element);
	    	orderNumber ++;
	    	spanNumber ++;
	    }
	}
    margin = (width - (spanWidth*spanNumber))/2;
	document.getElementsByClassName("draw-phrase")[0].style.marginLeft = margin.toString() + "px";
}
//************************Player Class**************************
//Player class constructor
function Player() {
	this.name;
	this.guess;
	this.phrase;
}
//Returns player's name
Player.prototype.getName = function() {
	return this.name;
}
//Set player's name
Player.prototype.setName = function() {
	var name = document.getElementById("name-input").value;
	this.name = name;
}
//Set a player letter guess
Player.prototype.setGuess = function() {
	var guess = document.getElementById("guess-input").value;
	this.guess = guess.toLowerCase();
}
//Return the player letter guess
Player.prototype.getGuess = function() {
	return this.guess;
}
//Sets the prhase to guess
Player.prototype.setPhrase = function() {
	var phrase = document.getElementById("phrase-form").value;
	this.phrase = phrase.toLowerCase();
}
//Returns the phrase to guess
Player.prototype.getPhrase = function(){
	return this.phrase;
}
//********* Manage Data ************
//Make the bottons in html work
window.onload = function() {
	var saveButton = document.getElementById("save-button");
	var submitButton = document.getElementById('guess-submit');
	saveButton.addEventListener('click', getData,false);
	submitButton.addEventListener('click',submitData,false);
	
}
//Set funcionality of Submit button
function submitData() {
	player.setGuess();
	game.setCorrectPositions();
	game.getCorrectPositions();
	game.checkAttemps();
	game.drawLetter();
	console.log(game.getCorrectLetter());
    console.log(game.getLeftOpportunities());
	console.log(player.name + " ***** " + /*game.getList()*/ + " ++++++ " + player.getName());
}
//Set funcionality of Save button
function getData() {
	player.setName();
	player.setPhrase();
	game.addPlayer(player);
	game.drawPhrase();
	drawGallows();
	var p = document.createElement("p");
	document.getElementById("results").appendChild(p);
	p.appendChild(document.createTextNode(player.getName().toString()));
	p.appendChild(document.createTextNode("   " + player.getPhrase().toString()));
	console.log(player.getName() + " **** " + player.phrase + " ****** " + player.getPhrase());
}
//Draw the gallow
function drawGallows() {
	var canvas = document.getElementById("canvas-guess");
	var ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(145,85);
    ctx.rect(145,85,20,5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(155,85);
    ctx.lineTo(155,30);
    ctx.lineTo(190,30);
    ctx.lineTo(190,40);
    ctx.lineCap="square";
    ctx.lineWidth="0.5";
    ctx.strokeStyle = "black";
    ctx.stroke();
}
//Draw head
function drawHead() {
	var canvas = document.getElementById("canvas-guess");
	var ctx = canvas.getContext('2d');
    
    ctx.beginPath();
	ctx.moveTo(190,40);
	ctx.arc(190,50,7.5,1.5*Math.PI,3.5*Math.PI);
	//ctx.arc(100,75,7.5,0,2*Math.PI);
	ctx.stroke();
}
//Draw body
function drawBody() {
	var canvas = document.getElementById("canvas-guess");
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.moveTo(190,58);
	ctx.lineTo(190,78);
	ctx.stroke();
}
//Draw right arm
function drawRightArm() {
	var canvas = document.getElementById("canvas-guess");
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.moveTo(190,63);
	ctx.lineTo(200,73);
	ctx.stroke();
}
//Draw left arm
function drawLeftArm() {
	var canvas = document.getElementById("canvas-guess");
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.moveTo(190,63);
	ctx.lineTo(200,53);
	//ctx.lineTo(180,73);
	ctx.stroke();
}
//Draw left leg
function drawLeftLeg() {
	var canvas = document.getElementById("canvas-guess");
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.moveTo(190,78);
	ctx.lineTo(200,88);
	ctx.stroke();
}
//Draw right leg
function drawRightLeg() {
	var canvas = document.getElementById("canvas-guess");
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.moveTo(190,78);
	ctx.lineTo(180,88);
	ctx.stroke();
}


