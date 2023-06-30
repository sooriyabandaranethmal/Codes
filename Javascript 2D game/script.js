var checkId = 0;
var animateId = 0;
var newCloudId = 0;
var newCoinId = 0;
var newLivesId = 0;
var newDiamondId = 0;
var lives = 5;
var coins = 0;
var totalCoins = 0;
var GameOver = false;
var moveBulltWorkerId = 0;
var engineSound = new Audio("engine.mp3");
var newCoinSound = new Audio("new coin.mp3");
var newLifeSound = new Audio("new life.mp3");
var lostLifeSound = new Audio("lost coin.mp3");
var gameOverSound = new Audio("game over.mp3");
var shootSound = new Audio("shoot.mp3")
engineSound.loop = true;
engineSound.volume = 0.04; 
setLives();
setCoins();
document.getElementById("over").innerHTML = "<h1 style = \"font-size: 40px;\">Press enter to start</h1><br><br><br><br><br><br><br><br>";
document.getElementById("over").style.display = "block";
function keyCheck(event){
	if(!GameOver){
		if(event.which == 13){

			if(runWorkerId == 0){
				document.getElementById("over").style.display = "none";
				runWorkerId =  setInterval(run,1);
				checkId =  setInterval(check,50);
				animateId = setInterval(newCloud,1500);
				newCloudId =  setInterval(animate,100);
				newCoinId = setInterval(newCoin,2250);
				newLivesId = setInterval(newLife,10000);
				newDiamondId = setInterval(newDiamond,20000);
				engineSound.play();

			}
		}else if(event.which == 38){
			if(downInterval == 0){
				downInterval = setInterval(down,speed);
			}
		}
		else if(event.which == 40){
			if(upInterval == 0){
				upInterval = setInterval(up,speed);
			}
		}else if(event.which == 32){
			if (moveBulltWorkerId == 0) {
				Fire();
				moveBulltWorkerId = setInterval(moveBullet,1);}

			}
			else if(event.which == 39){

			if (moveBulltWorkerId == 0) {
				Fire();
				moveBulltWorkerId = setInterval(moveBullet,1);}


			}
		}
	}

	var runImageNumber = 1;
	var runWorkerId = 0;
	var bX = 0;
	var upInterval = 0;;
	var downInterval = 0;;

	function run(){

		for (var i = 0; i < document.getElementsByClassName("cloud").length; i++) {
			document.getElementsByClassName("cloud")[i].style.right = (Number(document.getElementsByClassName("cloud")[i].style.right.replace("px", ""))+1)+"px";
		}
		for (var i = 0; i < document.getElementsByClassName("coin").length; i++) {
			document.getElementsByClassName("coin")[i].style.right = (Number(document.getElementsByClassName("coin")[i].style.right.replace("px", ""))+1)+"px";
		}
		for (var i = 0; i < document.getElementsByClassName("heart").length; i++) {
			document.getElementsByClassName("heart")[i].style.right = (Number(document.getElementsByClassName("heart")[i].style.right.replace("px", ""))+1)+"px";
		}
		for (var i = 0; i < document.getElementsByClassName("diamond").length; i++) {
			document.getElementsByClassName("diamond")[i].style.right = (Number(document.getElementsByClassName("diamond")[i].style.right.replace("px", ""))+1)+"px";
		}
	}

	function newCloud(){
		var top = Math.floor(Math.random() * (window.innerHeight-150));


		document.getElementById("display").innerHTML = "<img src = 'cloud.png'  style = 'top:"+top+"px;' class = \"cloud\"></img>"+document.getElementById("display").innerHTML;


	}

	var player = document.getElementById("Player");
	var frame = 1;
	function animate(){
		frame++;
		if(frame == 3){
			frame = 1;
		}
		player.src = "Fly ("+frame+").png"

	}
	var rotateAngle = 45;
	var speed = 2;
	function up(){
		if(Number(player.style.top.replace("px", "")) < window.innerHeight-150){
			player.style.top = (Number(player.style.top.replace("px", ""))+2)+"px";
		}
	}
	function down(){
		if(Number(player.style.top.replace("px", "")) > 10){
			player.style.top = (Number(player.style.top.replace("px", ""))-2)+"px";
		}
	}

	function keyCheckUp(event){
		clearInterval(upInterval);
		clearInterval(downInterval);
		downInterval = 0;
		upInterval = 0;
		player.style.transform = 'rotate(0deg)';
	}

	function reset(){
		clearInterval(animateId);
		clearInterval(newCloudId);
		clearInterval(runWorkerId);
		clearInterval(checkId);
		clearInterval(newCoinId);
		clearInterval(newLivesId);
		clearInterval(newDiamondId);
		runWorkerId = 0;
		var clouds = document.getElementsByClassName("cloud");
		for (var i = 0; i < clouds.length; i++) {
			clouds[i].remove();
		}
		clouds = document.getElementsByClassName("cloud");
		for (var i = 0; i < clouds.length; i++) {
			clouds[i].remove();
		}

		clouds = document.getElementsByClassName("cloud");
		for (var i = 0; i < clouds.length; i++) {
			clouds[i].remove();
		}
		var diamonds = document.getElementsByClassName("diamond");
		for (var i = 0; i < diamonds.length; i++) {
			diamonds[i].remove();
		}
		lives--;
		lostLifeSound.play();
		setLives();
		player.src = "Dead (1).png";
		engineSound.pause();
		document.getElementById("over").innerHTML = "<h1 style = \"font-size: 130px;\">𓊕</h1><h1 style = \"font-size: 40px;\">You lost one of your hearts</h1><h1><br>Press enter to resume</h1><br><br><br><br><br><br><br><br>";
		document.getElementById("over").style.display = "block";
		if(lives == 0){
			document.getElementById("over").innerHTML = "<h1 style = \"font-size: 80px;\">GAME OVER</h1><h1><br>Your plane is destroyed</h1><button class = \"playAgain\" onclick=\"window.location = 'start.html'\">Play again</button>";
			document.getElementById("over").style.display = "block";
			GameOver = true;
			engineSound.pause();
			gameOverSound.play();
		}

	}

	function check(){
		for (var i = 0; i < document.getElementsByClassName("cloud").length; i++) {
			if(elementsOverlap(document.getElementsByClassName("cloud")[i],player)){

				reset();
			}
			if(parseInt(document.getElementsByClassName("cloud")[i].style.right.replace("px","")) > (window.innerWidth-20)){
				document.getElementsByClassName("cloud")[i].remove();
			}
			for(var j = 0;j<document.getElementsByClassName("bullet").length;j++){
				if(elementsOverlap(document.getElementsByClassName("cloud")[i],document.getElementsByClassName("bullet")[j])){
					document.getElementsByClassName("cloud")[i].remove();

				}
			}
		}
		for (var i = 0; i < document.getElementsByClassName("coin").length; i++) {
			if(elementsOverlap(document.getElementsByClassName("coin")[i],player)){

				coins++;
				setCoins();
				document.getElementsByClassName("coin")[i].remove();
				newCoinSound.play();

			}
		//console.log(parseInt(document.getElementsByClassName("coin")[i].style.right.replace("px","")));
			if(parseInt(document.getElementsByClassName("coin")[i].style.right.replace("px","")) > (window.innerWidth)){
				document.getElementsByClassName("coin")[i].remove();
			}

		}

		for (var i = 0; i < document.getElementsByClassName("diamond").length; i++) {
			if(elementsOverlap(document.getElementsByClassName("diamond")[i],player)){

				coins = coins + 20;
				setCoins();
				document.getElementsByClassName("diamond")[i].remove();
				newCoinSound.play();

			}

		}
		for (var i = 0; i < document.getElementsByClassName("heart").length; i++) {
			if(elementsOverlap(document.getElementsByClassName("heart")[i],player)){
				if(lives < 5){
					lives++;
					newLifeSound.play();
					setLives();
					document.getElementsByClassName("heart")[i].remove();

				}	
			}

		}
	}


	function elementsOverlap(el1, el2) {
		const domRect1 = el1.getBoundingClientRect();
		const domRect2 = el2.getBoundingClientRect();

		return !(
			domRect1.top > domRect2.bottom-10||
			domRect1.right < domRect2.left-10 ||
			domRect1.bottom < domRect2.top+15 ||
			domRect1.left > domRect2.right
			);
	}
	function elementsOverlapCoin(el1, el2) {
		const domRect1 = el1.getBoundingClientRect();
		const domRect2 = el2.getBoundingClientRect();

		return !(
			domRect1.top > domRect2.bottom||
			domRect1.right < domRect2.left||
			domRect1.bottom < domRect2.top||
			domRect1.left > domRect2.right
			);
	}


	function setLives(){

		for(var i = 1;i<6;i++){

		//document.getElementById("life"+i).style.display = 'none';
			document.getElementById("life"+i).src = "Lost life.png";
		}
		for(var i = 1;i<lives+1;i++){

		//document.getElementById("life"+i).style.display = 'inline-block';
			document.getElementById("life"+i).src = "life.png";
		}


	}
	function setCoins(){
		document.getElementById("coins").innerHTML = coins;


	}


	function newCoin(){


		var top = Math.floor(Math.random() * (window.innerHeight-150));

		document.getElementById("display").innerHTML = "<img src = 'coin.gif'  style = 'top:"+top+"px;' class = \"coin\"></img>"+document.getElementById("display").innerHTML;
		totalCoins++;
		setCoins();
	}


	function newLife(){

		if(lives < 5){


			var top = Math.floor(Math.random() * (window.innerHeight-150));

			document.getElementById("display").innerHTML = "<img src = 'life.png'  style = 'top:"+top+"px;' class = \"heart\"></img>"+document.getElementById("display").innerHTML;
		}

	}

	function newDiamond(){
		var top = Math.floor(Math.random() * (window.innerHeight-150));

		document.getElementById("display").innerHTML = "<img src = 'diamond.png'  style = 'top:"+top+"px;' class = \"diamond\"></img>"+document.getElementById("display").innerHTML;
		totalCoins = totalCoins + 100;
		setCoins();
	}

	function Fire(){
		shootSound.play();
		if((coins/2) > 1){

			coins = coins - 2;
			setCoins();
			var top = (parseInt(player.style.top.replace("px","")))+36;
			document.getElementById("display").innerHTML = "<img src = 'Missile.gif'  style = 'left: 0px;top:"+top+"px;' class = \"bullet\"></img>"+document.getElementById("display").innerHTML;
		}
	}

	function moveBullet(){
		if(document.getElementsByClassName("bullet").length == 0){
			clearInterval(moveBulltWorkerId);
			moveBulltWorkerId = 0;
		}
		for (var i = 0; i < document.getElementsByClassName("bullet").length; i++) {
			document.getElementsByClassName("bullet")[i].style.left = (parseInt(document.getElementsByClassName("bullet")[i].style.left.replace("px", ""))+2)+"px";
	//alert(document.getElementsByClassName("bullet")[i].style.left);
			if(parseInt(document.getElementsByClassName("bullet")[i].style.left.replace("px","")) == (window.innerWidth-300)){
				document.getElementsByClassName("bullet")[i].remove();
			}

		}
	}