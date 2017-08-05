/**
 * Created by AdrianH on 7/28/2017.
 * Proudly presents my calculation on the animation's speed for the fun & balance of the game
 */

var winning=1;
var raceWidth=0;
var x = 0;
var alternating =0;


function Chocobo(name, image, min, max) {
	this.name = name;
	this.image = document.getElementById(image);
	this.position=0;
	this.interval=0;
	this.speed=0;
	this.win=0;
	this.wager=0;
	this.baseSpeed=51-max; 
	this.speedRange= max-min; 
	/* How do I calculate/convert the displayed mph VS the actual number that will be use
		50mph -> 1
		40mph -> 11
		30mph -> 21
		21mph -> 30

		51-[##mph] -> #
		mph   -> [speedRange] & [baseSpeed]
		33-40 -> 8 & 11
		29-43 -> 22 & 8
		27-35 ... etc
		21-25
	*/
}

var Boco = new Chocobo("Boco", "Normal", 33, 40);
var Betty = new Chocobo("Betty", "Green", 29, 43);
var Kuro = new Chocobo("Kuro", "Black", 27, 35);
var Berserker = new Chocobo("Berserker", "Red", 21, 25);

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- 2nd BUTTONS ----------------------------------------------------------
function clicking() {
	raceWidth=window.innerWidth-104-7-5; //Determine the size of the window
										// minus track image's width, body's padding, farm field's padding
	Normal();
	Green();
	Red();
	Black();
	runningAnimation();
}
function starting() {
	if(x==0) x = setInterval(
		function(){
			if(winning==0) {
				Stop();
				if(Boco.win) {
					alert("Boco is the winner!");
					document.getElementById("balance").value = parseInt(document.getElementById("balance").value) + Boco.wager*3;
					console.log("Boco wins");
				}
				else if (Betty.win) {
					alert("Betty is the winner!");
					document.getElementById("balance").value = parseInt(document.getElementById("balance").value) + Betty.wager*3;
					console.log("Betty wins");
				}
				else if (Kuro.win) {
					alert("Kuro is the winner!");
					document.getElementById("balance").value = parseInt(document.getElementById("balance").value) + Kuro.wager*3;
					console.log("Kuro wins");
				}
				else if (Berserker.win) {
					alert("Berserker is the winner!");
					document.getElementById("balance").value = parseInt(document.getElementById("balance").value) + Berserker.wager*3;
					console.log("Berserker wins");
				}
				clearInterval(x);
				document.getElementById("startButton").value = "Next Round";
			} else
			clicking();
		}, 1000);

	else if(document.getElementById("startButton").value == "Next Round") {
		restart();
		document.getElementById("startButton").value = "Start!";
	}
}

function restart() {
	//restart and reset EVERYTHING except user's balance
	Boco.position=0;Boco.interval=0;Boco.speed=0;Boco.win=0;Boco.wager=0;Boco.image.style.left = Boco.position + 'px';
	Betty.position=0;Betty.interval=0;Betty.speed=0;Betty.win=0;Betty.wager=0;Betty.image.style.left = Betty.position + 'px';
	Kuro.position=0;Kuro.interval=0;Kuro.speed=0;Kuro.win=0;Kuro.wager=0;Kuro.image.style.left = Kuro.position + 'px';
	Berserker.position=0;Berserker.interval=0;Berserker.speed=0;Berserker.win=0;Berserker.wager=0;Berserker.image.style.left = Berserker.position + 'px';

	document.getElementById("selectBoco").style.visibility = "visible";
	document.getElementById("selectBetty").style.visibility = "visible";
	document.getElementById("selectKuro").style.visibility = "visible";
	document.getElementById("selectBerserker").style.visibility = "visible";

	document.getElementById("startButton").style.visibility = "hidden";
	x=0; winning=1;
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ FUNCTIONS ---------------------------------------------------------

function Normal() {
	Boco.speed = Math.floor(Math.random()*Boco.speedRange)+ Boco.baseSpeed;
	clearInterval(Boco.interval);
	Boco.interval = setInterval(Nmoving, Boco.speed);
}
function Nmoving() {
	Boco.position++;
	if (Boco.position>=raceWidth && winning) {
		winning=0; Boco.win=1;
	}
	Boco.image.style.left = Boco.position + 'px';
}

function Green() {
	Betty.speed = Math.floor(Math.random()*Betty.speedRange)+Betty.baseSpeed;
	//if (Gspeed>15) if(Math.floor(Math.random()*2)==0) Gspeed-=10;//50% chance of running berserk for a sec
	clearInterval(Betty.interval);
	Betty.interval = setInterval(Gmoving, Betty.speed);
}
function Gmoving() {
	Betty.position++;
	if (Betty.position>=raceWidth && winning) {
		winning=0; Betty.win=1;
	}
	Betty.image.style.left = Betty.position + 'px';
}

function Black() {
	Kuro.speed = Math.floor(Math.random()*Kuro.speedRange)+Kuro.baseSpeed;
	if (Kuro.speed>Kuro.baseSpeed+4) if(Math.floor(Math.random()*2)==0) Kuro.speed-=15;//50% chance of running berserk for a sec
	clearInterval(Kuro.interval);
	Kuro.interval = setInterval(Bmoving, Kuro.speed);
}
function Bmoving() {
	Kuro.position++;
	if (Kuro.position>=raceWidth && winning) {
		winning=0; Kuro.win=1;
	}
	Kuro.image.style.left = Kuro.position + 'px';
}

function Red() {
	Berserker.speed = Math.floor(Math.random()*Berserker.speedRange)+Berserker.baseSpeed;
	if (Berserker.speed==Berserker.baseSpeed) Berserker.speed=1;//50% chance of running berserk for a sec
	clearInterval(Berserker.interval);
	Berserker.interval = setInterval(Rmoving, Berserker.speed);
}
function Rmoving() {
	Berserker.position++;
	if (Berserker.position>=raceWidth && winning) {
		winning=0; Berserker.win=1;
	}
	Berserker.image.style.left = Berserker.position + 'px';
}


function Stop() {
	clearInterval(Boco.interval);
	clearInterval(Betty.interval);
	clearInterval(Kuro.interval);
	clearInterval(Berserker.interval);
}

function runningAnimation() {
	if(alternating) {
		Boco.image.src="pic/2Normal.png";
		Betty.image.src="pic/2Green.png";
		Kuro.image.src="pic/2Black.png";
		Berserker.image.src="pic/2Red.png";
		alternating=0;
	}
	else {
		Boco.image.src="pic/3Normal.png";
		Betty.image.src="pic/3Green.png";
		Kuro.image.src="pic/3Black.png";
		Berserker.image.src="pic/3Red.png";
		alternating++;
	}
}


//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- 1st BUTTONS ----------------------------------------------------------
function bocoSelected() {
	if(document.getElementById("betInput").value < 0 || (parseInt(document.getElementById("balance").value) < parseInt(document.getElementById("betInput").value))) alert("Please enter an appropriate number to bet!");
	else {
		initSelection();
		Boco.wager = document.getElementById("betInput").value;
		document.getElementById("balance").value -= document.getElementById("betInput").value;
	}
}
function bettySelected() {
	if(document.getElementById("betInput").value < 0 || (parseInt(document.getElementById("balance").value) < parseInt(document.getElementById("betInput").value))) alert("Please enter an appropriate number to bet!");
	else {
		initSelection();
		Betty.wager = document.getElementById("betInput").value;
		document.getElementById("balance").value -= document.getElementById("betInput").value;
	}
}
function kuroSelected() {
	if(document.getElementById("betInput").value < 0 || (parseInt(document.getElementById("balance").value) < parseInt(document.getElementById("betInput").value))) alert("Please enter an appropriate number to bet!");
	else {
		initSelection();
		Kuro.wager = document.getElementById("betInput").value;
		document.getElementById("balance").value -= document.getElementById("betInput").value;
	}
}
function berserkerSelected() {
	if(document.getElementById("betInput").value < 0 || (parseInt(document.getElementById("balance").value) < parseInt(document.getElementById("betInput").value))) alert("Please enter an appropriate number to bet!");
	else {
		initSelection();
		Berserker.wager = document.getElementById("betInput").value;
		document.getElementById("balance").value -= document.getElementById("betInput").value;
	}
}

function initSelection() {
	document.getElementById("selectBoco").style.visibility = "hidden";
	document.getElementById("selectBetty").style.visibility = "hidden";
	document.getElementById("selectKuro").style.visibility = "hidden";
	document.getElementById("selectBerserker").style.visibility = "hidden";

	document.getElementById("startButton").style.visibility = "visible";
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
