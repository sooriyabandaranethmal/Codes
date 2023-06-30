var intervalId = 0;
var opacity = 1;
function checkKey(event){
	if(event.which == 13){
		
		intervalId =  setInterval(doThings,2);
	}
}

var curr = -50;
function doThings(){
	var TimeoutWorker = 0;

	if(curr.toFixed(5) == 40.00000){
		curr = 41.00000;
		TimeoutWorker = setTimeout(FromMiddle, 5000);
		clearInterval(intervalId);
	}else{
		curr = curr + 0.05;
		console.log(curr);
	}
	if(curr.toFixed(2) == 100.00){
		window.location = "index.html";
	}
	document.getElementById("text").style.opacity = opacity;
	opacity = opacity - 0.005;
	document.getElementById("image").style.left = curr+"vw";

}
function FromMiddle() {
	setInterval(doThings,2)
	clearTimeout(TimeoutWorker);

}