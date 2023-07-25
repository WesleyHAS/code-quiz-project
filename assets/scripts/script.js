var secondsLeft = 60;
var startGameScreen = document.getElementById('start-game-screen');
var screen1 = document.getElementById('quiz-screen-1');

function startGame() {
 var timerInterval = setInterval(function() {
  secondsLeft--;

  if(secondsLeft === 0) {
    clearInterval(timerInterval);
  }
  var timer = document.getElementById('timer');
  timer.textContent = 'Time: ' + secondsLeft;
 }, 1000);

 startGameScreen.classList.add('hidden');
 screen1.classList.remove('hidden');
}

var startQuizButton = document.getElementById('start-quiz');
startQuizButton.addEventListener('click', startGame);