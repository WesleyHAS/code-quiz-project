//Global variables
var secondsLeft = 60;
var startGameScreen = document.getElementById('start-game-screen');
var screen1 = document.getElementById('quiz-screen-1');
var screen2 = document.getElementById('quiz-screen-2');
var screen3 = document.getElementById('quiz-screen-3');
var screen4 = document.getElementById('quiz-screen-4');
var screen5 = document.getElementById('quiz-screen-5');
var viewHighScores = document.getElementById('view-highscores-screen');
var showTimer = document.getElementById('show-timer');
var submitScreen = document.getElementById('submit-screen');
var timerInterval;

function stopTimer() {
  clearInterval(timerInterval);
}

function startHighScores() {
  startGameScreen.classList.add('hidden');
  viewHighScores.classList.remove('hidden');
}

var viewHighScoresButton = document.getElementById('view-highscores');
viewHighScoresButton.addEventListener('click', startHighScores);

function finishGame() {
  screen5.classList.add('hidden');
  viewHighScores.classList.remove('hidden');
  submitScreen.classList.add('hidden');
}

var submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', finishGame);

function goBack() {
  viewHighScores.classList.add('hidden');
  startGameScreen.classList.remove('hidden');
}

var goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', goBack);

//Function to start game and timer
function startGame() {
  timerInterval = setInterval(function() {
  secondsLeft--;

  if(secondsLeft === 0) {
    clearInterval(timerInterval);
  }
  var timer = document.getElementById('timer');
  timer.textContent = 'Time: ' + secondsLeft;
 }, 1000);

 startGameScreen.classList.add('hidden');
 screen1.classList.remove('hidden');
 showTimer.classList.remove('hidden');
}

//Event listener to start game when click
var startQuizButton = document.getElementById('start-quiz');
startQuizButton.addEventListener('click', startGame);

//Loop to start next question
var startNextQuestion = document.querySelectorAll('.questions-container .alternatives');

for (var i = 0; i < startNextQuestion.length; i++) {
  startNextQuestion[i].addEventListener('click', nextScreen);
}

/* Reference for classList https://developer.mozilla.org/en-US/docs/Web/API/Element/classList */

//Function to swap screens
function nextScreen() {
  if (!screen1.classList.contains('hidden')) {
    // Move from screen1 to screen2
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
  } else if (!screen2.classList.contains('hidden')) {
    // Move from screen2 to screen3
    screen2.classList.add('hidden');
    screen3.classList.remove('hidden');
  } else if (!screen3.classList.contains('hidden')) {
    //Move from screen3 to screen4
    screen3.classList.add('hidden');
    screen4.classList.remove('hidden');
  } else if (!screen4.classList.contains('hidden')) {
    //Move from screen4 to screen5
    screen4.classList.add('hidden');
    screen5.classList.remove('hidden');
  } else if (!screen5.classList.contains('hidden')) {
    //Move from screen5 to submit screen
    screen5.classList.add('hidden');
    submitScreen.classList.remove('hidden');
    showTimer.classList.add('hidden');
    stopTimer();
  }
  
}