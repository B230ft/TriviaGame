var timerStart = Date.now();

$(document).ready(function() {
// Create a function that creates the start button and initial screen
console.log("Time start: ", Date.now()-timerStart);
function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();



$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper
$(window).load(function() {
    console.log("Time until everything loaded: ", Date.now()-timerStart);
});
function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 10;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(tenSeconds, 1000);
	function tenSeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Results!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 10;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 10;
var questionArray = ["What is the capital of Alabama?", "What is the capital of New York?", "What is the capital of Kentucky?", "What is the capital of Washington?", "What is the capital of California?", "What is the capital of Connecticut?", "What is the capital of Ohio?", "What is the capital of North Carolina?"];
var answerArray = [["Huntsville", "Montgomery", "Birmingham", "Tuscaloosa"], ["Poughkeepsie","Syracuse","Albany","New York"], ["Frankfurt", "Louisville", "Lexington", "Bowling Green"], ["Seattle","Tacoma","Olympia","Spokane"], ["Los Angeles", "Sacramento", "San Diego", "San Francisco"], ["Waterbury","Hartford","New Haven","Middletown"], ["Akron", "Cleveland", "Mansfield", "Columbus"], ["Raleigh","Fayetteville","Durham","Charlotte"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/alabama.jpg'>", "<img class='center-block img-right' src='assets/images/Albany.jpg'>", "<img class='center-block img-right' src='assets/images/Kentucky.jpg'>", "<img class='center-block img-right' src='assets/images/Washington.jpg'>", "<img class='center-block img-right' src='assets/images/California.jpg'>", "<img class='center-block img-right' src='assets/images/Connecticut.jpg'>", "<img class='center-block img-right' src='assets/images/Ohio.jpg'>", "<img class='center-block img-right' src='assets/images/NC.jpg'>"];
var correctAnswers = ["B. Montgomery", "C. Albany", "A. Frankfurt", "C. Olympia", "B. Sacramento", "B. Hartford", "D. Columbus", "A. Raleigh"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/images/click.mp3");