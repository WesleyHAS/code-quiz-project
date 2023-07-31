//Global variables
var secondsLeft = 60;
var timerInterval;
var highScoresArray = [];

//Element selectors
var startGameScreen = document.getElementById('start-game-screen');
var screen1 = document.getElementById('quiz-screen-1');
var screen2 = document.getElementById('quiz-screen-2');
var screen3 = document.getElementById('quiz-screen-3');
var screen4 = document.getElementById('quiz-screen-4');
var screen5 = document.getElementById('quiz-screen-5');
var viewHighScores = document.getElementById('view-highscores-screen');
var showTimer = document.getElementById('show-timer');
var submitScreen = document.getElementById('submit-screen');
var finalScoreSpan = document.getElementById('final-score');
var timer = document.getElementById('timer');
var displayHighScoreSpan = document.getElementById('display-highscores');
var submitButton = document.getElementById('submit-button');
var msgDiv = document.getElementById('msg');
var clearScores = document.getElementById('clear-high-scores');
var displayAnswer = document.getElementById('display-answer');
var viewHighScoresButton = document.getElementById('view-highscores');
var goBackButton = document.getElementById('go-back');
var startQuizButton = document.getElementById('start-quiz');
var startNextQuestion = document.querySelectorAll('.questions-container .alternatives');

//Created elements
var screenAsnwer = document.createElement('p');
displayAnswer.appendChild(screenAsnwer);

//Event listeners
viewHighScoresButton.addEventListener('click', startHighScores);
clearScores.addEventListener('click', clearHighScores);
goBackButton.addEventListener('click', goBack);
startQuizButton.addEventListener('click', startGame);

//Function to start game and timer
function startGame() {
  timerInterval = setInterval(function() {
  secondsLeft--;

  if(secondsLeft <= 0) {
    secondsLeft = 0;
    clearInterval(timerInterval);
  }

  timer.textContent = 'Time: ' + secondsLeft;
 }, 1000);

 startGameScreen.classList.add('hidden');
 screen1.classList.remove('hidden');
 showTimer.classList.remove('hidden');
}

/* Reference for classList https://developer.mozilla.org/en-US/docs/Web/API/Element/classList */

//Function to swap screens
function nextScreen() {

  if (!screen1.classList.contains('hidden')) {
    // Move from screen1 to screen2
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
    displayAnswer.classList.remove('hidden');
  } else if (!screen2.classList.contains('hidden')) {
    // Move from screen2 to screen3
    screen2.classList.add('hidden');
    screen3.classList.remove('hidden');
    displayAnswer.classList.remove('hidden');
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
    stopTimer();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

//Loop to swap between screens
for (var i = 0; i < startNextQuestion.length; i++) {
  startNextQuestion[i].addEventListener('click', nextScreenAndCheckAnswer);
}

//Check if answer is correct or wrong, input answer on screen and prevents timer to go negative
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var isCorrect = event.target.getAttribute('data-correct') === 'true';

  if (isCorrect) {
    screenAsnwer.textContent = 'Correct!';

  } else {
    screenAsnwer.textContent = 'Wrong!';

    secondsLeft -= 10;

    if(secondsLeft <= 0) {
      secondsLeft = 0;
      clearInterval(timerInterval);
    }
    // Update the timer display
    timer.textContent = 'Time: ' + secondsLeft;
  }
  //display final time on the final-score span tag
  finalScoreSpan.textContent = secondsLeft;
}

function nextScreenAndCheckAnswer(event) {
  nextScreen(event);
  checkAnswer(event);
}

//Add score to the empty array and finishes the game
submitButton.addEventListener('click', function(event){

  var name = document.getElementById('name').value;
  var finalScore = secondsLeft;

  if (name === '') {
    displayMessage('error', 'Please input your initials');
  } else {

    localStorage.setItem('finalTimer', finalScore);
    localStorage.setItem('storedInitials', name);

    if (localStorage.getItem('storedInitials') && localStorage.getItem('finalTimer')) {

      var personalScore = {
        scoreName: localStorage.getItem('storedInitials'),
        scoreTime: localStorage.getItem('finalTimer')
      }
  
      highScoresArray.push(personalScore);
    }

    localStorage.setItem('highScoreArray', JSON.stringify(highScoresArray));

    renderHighScores();  
    finishGame();
  }

  displayAnswer.classList.add('hidden');
});

if (localStorage.getItem('highScoreArray')) {
  highScoresArray = JSON.parse(localStorage.getItem('highScoreArray'));
}

//Displays message if user tries to submit without any input
function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

//Renders the highscore and sort it by desc order
function renderHighScores () {
  var scoreText = '';

  displayHighScoreSpan.textContent = '';
  var listScores = document.createElement("ul");


  /* Reference for sorting array desc https://www.w3schools.com/jsref/jsref_sort.asp */
  highScoresArray.sort(function (a, b) {
    return b.scoreTime - a.scoreTime;
  });

  for (var i = 0; i < highScoresArray.length; i++) {
    var li = document.createElement('li');
    li.textContent = highScoresArray[i].scoreName + '-' + highScoresArray[i].scoreTime;
    listScores.appendChild(li);
  }

  console.log(highScoresArray);
  displayHighScoreSpan.appendChild(listScores);
}

function finishGame() {
  screen5.classList.add('hidden');
  viewHighScores.classList.remove('hidden');
  submitScreen.classList.add('hidden');
}

function startHighScores() {
  startGameScreen.classList.add('hidden');
  viewHighScores.classList.remove('hidden');

  renderHighScores();
}

function clearHighScores () {
  localStorage.clear();
  displayHighScoreSpan.textContent = '';
  highScoresArray = [];
}

function goBack() {
  viewHighScores.classList.add('hidden');
  startGameScreen.classList.remove('hidden');
  document.getElementById('name').value = null;
  showTimer.classList.add('hidden');
  secondsLeft = 60;
  location.reload();
}