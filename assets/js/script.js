var startButton = document.querySelector('.startBtn');
var questionBox = document.querySelector('.Question-Box');
var answersList = document.querySelectorAll('.answers button');
var timerDisplay = document.querySelector('.Timer p');
var highScoreButton = document.querySelector('.HighScoreButton button');

// all of the games questions
var questions = [
  {
    question: 'What is the main structure of a webpage?',
    answers: ['Html', 'CSS', 'JavaScript', 'Java'],
    correctAnswer: 0
  },
  {
    question: 'What does CSS stand for?',
    answers: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
    correctAnswer: 1
  },
];

var currentQuestion = 0;
var timeLeft = 60;
var timerInterval


// function to start the game
function startGame() {
  document.querySelector('.startingScreen').style.display = 'none';
  document.querySelector('.gameArea').style.display = 'block';
  gameReset();
  showQuestion();
  // starts the timer
    timerInterval = setInterval(function() {
    timeLeft--;
    timerDisplay.textContent = `Seconds: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// function that displays questions
function showQuestion() {
  var question = questions[currentQuestion];
  questionBox.querySelector('p').textContent = question.question;
  answersList.forEach(function(answerButton, index) {
    answerButton.textContent = question.answers[index];
  });
  // when an answer is clicked it will see if it was right
  answersList.forEach(function(answerButton) {
    answerButton.addEventListener('click', checkAnswer);
  });
}

// function to check an answer
function checkAnswer(event) {
  answersList.forEach(function(answerButton) {
    answerButton.removeEventListener('click', checkAnswer);
  });
  var chosenAnswerIndex = Array.from(answersList).indexOf(event.target);
  var question = questions[currentQuestion];
  // this will see if the answer submitted is correct
  if (chosenAnswerIndex === question.correctAnswer) {
     // this will go to the next question and check if there are any left
     currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  } else {
    // If answered incorrect it will subtract 5 seconds
    timeLeft -= 5;
    // this will end the game if the -5 seconds puts you below 0 seconds
    if (timeLeft > 0) {
      showQuestion();
    } else {
      endGame();
    }
  }
}

// function to end the game
function endGame() {
  clearInterval(timerInterval);
  // asks the palyer for the name they want to submit
  var playerName = prompt("Enter name:")
  var newHighScore = {
    name: playerName,
    score: timeLeft
};
// pulls the local storage then pushes the new highscore then will store it along the rest of the scores
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
highScores.push(newHighScore);
highScores.sort((a, b) => b.score - a.score);
localStorage.setItem('highScores', JSON.stringify(highScores));
  // shows final score
  alert(`Your final score is ${timeLeft}.`);
  document.querySelector('.startingScreen').style.display = 'block';
  document.querySelector('.gameArea').style.display = 'none';
  gameReset();
}
// function for reseting the value after the game has completed
function gameReset() {
  currentQuestion = 0;
  timeLeft = 60;
  clearInterval(timerInterval)
  timerDisplay.textContent = `Seconds: ${timeLeft}`;
}
// event for the start button
startButton.addEventListener('click', startGame);

function displayHighScores() {
    // checks the local storage for past scores
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  // makes a list of the highscores
    highScores.sort((a, b) => b.score - a.score);
    var highScoresList = highScores.map(score => {
      return `${score.name} - ${score.score}\n`;
    }).join('');
  
    // makes an alert box where the highscores are displayed
    if (highScoresList) {
      alert(`High Scores:\n${highScoresList}`);
    } else {
      alert('No high scores yet!');
    }
  }
 //event for the highscores button
highScoreButton.addEventListener('click', displayHighScores);

