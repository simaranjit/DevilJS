/**
 * @author Simaranjit Singh <simaranjit.singh@virdi.me>
 */
var totalSeconds = 0;
playerName = 'Guest', birthRate = 1000, movementSpeed = 200, angelMovementSpeed = 400, killedCount = 0, missedCount = 0, angelsKilled = 0, gameOver = false, savedCount = 0;
var DEVIL_TYPE_DROPPING = 1, DEVIL_TYPE_FLYING = 2, DEVIL_TYPE_WALKING = 3, DEVIL_TYPE_ANGEL = 4;
var ShootMusic = document.createElement("AUDIO");
var LaughMusic = document.createElement("AUDIO");
var BackgroundMusic = document.createElement("AUDIO");
var secondsLabel = document.getElementById("seconds");
var minutesLabel = document.getElementById("minutes");

if (ShootMusic.canPlayType("audio/mpeg")) {
	ShootMusic.setAttribute("src", "sounds/shot.mp3");
	LaughMusic.setAttribute("src", "lsounds/augh.mp3");
	BackgroundMusic.setAttribute("src", "sounds/music.mp3");
} else {
	ShootMusic.setAttribute("src", "sounds/shot.ogg");
}

function setTime() {
	++totalSeconds;
	secondsLabel.innerHTML = pad(totalSeconds % 60);
	minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	}
	else {
		return valString;
	}
}

function MoveDiv(element, devilType) {
	if (!document.getElementById(element.id)) {
		return;
	}

	if (gameOver) {
		element.parentElement.removeChild(element);
		return;
	}

	setTimeout(function() {

		if (devilType == DEVIL_TYPE_DROPPING) {
			element.style.top = (parseInt(element.style.top.replace(/[^-\d\.]/g, '')) + 10) + 'px';
			if (parseInt(element.style.top.replace(/[^-\d\.]/g, '')) >= window.innerHeight) {
				element.parentElement.removeChild(element);
				DevilGotMissed();
				return;
			}
		} else if (devilType == DEVIL_TYPE_WALKING) {
			element.style.left = (parseInt(element.style.left.replace(/[^-\d\.]/g, '')) + 10) + 'px';
			if (parseInt(element.style.left.replace(/[^-\d\.]/g, '')) >= window.innerWidth) {
				element.parentElement.removeChild(element);
				DevilGotMissed();
				return;
			}
		} else if (devilType == DEVIL_TYPE_FLYING) {
			element.style.bottom = (parseInt(element.style.bottom.replace(/[^-\d\.]/g, '')) + 20) + 'px';
			if (parseInt(element.style.bottom.replace(/[^-\d\.]/g, '')) >= window.innerHeight) {
				element.parentElement.removeChild(element);
				DevilGotMissed();
				return;
			}
		} else if (devilType == DEVIL_TYPE_ANGEL) {
			element.style.top = (parseInt(element.style.top.replace(/[^-\d\.]/g, '')) + 10) + 'px';
			if (parseInt(element.style.top.replace(/[^-\d\.]/g, '')) >= window.innerHeight) {
				element.parentElement.removeChild(element);
				AngelGotSaved();
				return;
			}
		} else {
			return;
		}

		MoveDiv(element, devilType);
	}, devilType == DEVIL_TYPE_ANGEL ? angelMovementSpeed : movementSpeed);
}

function Shoot() {
	ShootMusic.pause().play();
}

function DevilGotMissed() {
	LaughMusic.pause();
	LaughMusic.currentTime = 0;
	LaughMusic.play();
	document.getElementById('missed').innerHTML = ++missedCount;

	if (missedCount >= 20) {
		GameOver();
	}
}

function AngelGotSaved() {
	document.getElementById('saved').innerHTML = ++savedCount;

	//@todo next level logic would come here
}

function GameOver() {
	gameOver = true;
	document.getElementById('game').innerHTML = '<h1 />Game over</h1><br /> click <a href="index.php">Here</a> to restart';
}

function DevilGotKilled() {
	document.getElementById('killed').innerHTML = ++killedCount;
}

function KillDevil(element) {
	element.parentElement.removeChild(element);
	DevilGotKilled();
}

function KillAngel(element) {
	element.parentElement.removeChild(element);

	GameOver();
}

function CreateWalkingDevil(element) {
	element.style.cssText = 'background-image:url(\'images/walking-devil.gif\'); position:fixed;width:75px;height:92px; bottom:0px; left:0px';
}

function CreateFlyingDevil(element) {
	element.style.cssText = 'background-image:url(\'images/flying-devil.gif\'); position:fixed;width:190px;height:142px; bottom:0px; left:' + (Math.floor(Math.random() * (window.innerWidth - 190)) + 1);
}

function CreateDroppingDevil(element) {
	element.style.cssText = 'background-image:url(\'images/devil.gif\'); position:fixed;width:60px;height:54px; top:60px; left:' + (Math.floor(Math.random() * (window.innerWidth - 60)) + 1);
}

function CreateAngel(element) {
	element.style.cssText = 'background-image:url(\'images/angel.gif\'); position:fixed;width:90px;height:136px; top:60px; left:' + (Math.floor(Math.random() * (window.innerWidth - 90)) + 1);
}

document.onclick = function() {
	ShootMusic.pause();
	ShootMusic.currentTime = 0;
	ShootMusic.play();
}

Devil = function() {
	var LEVEL_BEGINNER = 1, LEVEL_STANDARD = 2, LEVEL_EXPERT = 3;
	var speed = 1, screenWidth = window.innerWidth, screenHeight = window.innerHeight;

	this.start = function(level) {
		BackgroundMusic.play();
		setInterval(setTime, 1000);
		this.CreateDiv();
	}

	this.CreateDiv = function() {
		document.getElementById('title').innerHTML = playerName + ', ' + document.getElementById('title').innerHTML;

		CreateDevil = setInterval(function() {
			if (gameOver) {
				clearInterval(CreateDevil);
			}
			var element = document.createElement('div');
			element.id = 'el' + (new Date()).getTime();

			var randomNumber = (Math.floor(Math.random() * 100) + 1), devilType = DEVIL_TYPE_DROPPING;
			if (randomNumber % 7 == 0) {
				CreateWalkingDevil(element);
				devilType = DEVIL_TYPE_WALKING;
			} else if (randomNumber % 9 == 0) {
				CreateFlyingDevil(element);
				devilType = DEVIL_TYPE_FLYING;
			} else if (randomNumber % 13 == 0) {
				CreateAngel(element);
				devilType = DEVIL_TYPE_ANGEL;
			} else {
				CreateDroppingDevil(element);
			}

			element.onclick = function() {
				if (devilType == DEVIL_TYPE_ANGEL) {
					KillAngel(element);
				} else {
					KillDevil(element);
				}
			}

			document.getElementById('game').appendChild(element);

			MoveDiv(element, devilType);
		}, birthRate);

		return this;

	}

	this.RemoveDiv = function(element, elementInterval) {
		if (element.style.top > 500) {
			clearInterval(elementInterval);
		}
	}

};

function askName() {
	playerName = prompt("You are playing game as:", "Guest");
	if (playerName != null) {
		Game = new Devil();
		Game.start();
	} else {
		alert('I am sorry, I can not let you go without having your identity :D, anyways jokes are apart, please fill your name..');
		askName()
	}
}

askName();





