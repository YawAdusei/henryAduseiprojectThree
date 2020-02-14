// Create an object for the game
// initialize the app
// welcome screen with start game option  (MVP: same screen; Stretch goal: Home Screen)
// user selects start game button and game begins
// user sees the first of 5 images of NBA players with their names underneath
// user has to input the correct team the player is currently on
// score is updated based on correct/incorrect answer inside of text box
// the game continues until 5 images are shown
// the user is show a game over screen with the score out of 5 and a play again  button.


const gameApp = {

    playersShown: [],
    userScore: {
        correct: 0,
        incorrect: 0
    },
    userAnswer: [],
    currentRandomPlayerImage: '',
    numOfPlayers: 5,
    answers: []
}

$(function() {
    gameApp.gameStart();
    // form submission event lister
    $('.playerImageContent form').on('submit', function(event) {
        event.preventDefault();
        console.log(this);
        gameApp.getUserAnswer();
        gameApp.checkInput();
        gameApp.gameStart();
    });
});

// Starting the game 
  gameApp.gameStart = function() {
    gameApp.beginGame();
    gameApp.playAgain();
    if (this.playersShown.length < this.numOfPlayers) {
      gameApp.getRandomPlayerImage();
    } else {
      gameApp.gameOver();
      gameApp.playAgain();
    };
};

//   Play again 
gameApp.playAgain = function() {
    $('.playAgain').on('click', function() {
        gameApp.restartGame();
        gameApp.getRandomPlayerImage();
    });
}

//   check to see if input is correct/incorrect; update the score after check 
gameApp.checkInput = function() {
      if (gameApp.currentRandomPlayerImage === gameApp.userAnswer) {
          gameApp.userScore.correct += 1;
          gameApp.updateScoreBoard(this.userScore);
      } else {
          gameApp.userScore.incorrect +=1;
          gameApp.updateScoreBoard(this.userScore);
      }
  }

//   generate random number; used to get random image from array 
  gameApp.getRandomNumber = function() {
      let randomNumber = Math.floor(Math.random() * players.length);
      return randomNumber; 
  }

//   get a random player image 
  gameApp.getRandomPlayerImage = function() {   
       let randomNumber = gameApp.getRandomNumber();
       const randomPlayerImage = players[randomNumber];
    
    // check that a player's image has not yet been used - GOOD
    if (gameApp.playersShown.indexOf(`${randomPlayerImage.team}`) >= 0 && gameApp.playersShown.length > 0) {
        gameApp.getRandomPlayerImage();
    } else {
    // use a random player's image that hasn't been used yet
    $('.playerImageContent img').attr('src', randomPlayerImage.image);
    gameApp.currentRandomPlayerImage = randomPlayerImage.team;
    $('.playerName').html(randomPlayerImage.name);

    // players get added to arrays to track number of questions asked and answered
    gameApp.playersShown.push(randomPlayerImage.team);
    gameApp.answers.push(randomPlayerImage);
    }
  }
    //   Getting the answer from the user input in the text box and storing it inside a variable

    gameApp.getUserAnswer = function() {
        
        let userAnswer = $('.playerImageContent input').val().toLowerCase();
        gameApp.userAnswer = userAnswer;

        // Adding the users answer to the answers array
        const index = gameApp.answers.findIndex(x => x.team === gameApp.currentRandomPlayerImage);
        gameApp.answers[index].userAnswer = userAnswer;
        $('.playerImageContent input').val();
    }

    // Update the scoreboard 
    gameApp.updateScoreBoard = function(score) {
        $('.score').text(`Score: ${score.correct} / ${score.correct + score.incorrect}`);  
    }

    // restart game function
    gameApp.restartGame = function() {
        gameApp.playersShown = [],
        gameApp.userScore = {
            correct: 0,
            incorrect: 0
        };
        gameApp.userAnswer = '';
        gameApp.currentRandomPlayerImage = '';
        gameApp.numOfPlayers = 5;
        gameApp.answers = []
        $('.score').text('Score: ');
        $('.results').text('');
    }

    //  function for gameOver
    gameApp.gameOver = function(score) {
        $(".playerName").text(`You got ${gameApp.userScore.correct} out of ${gameApp.numOfPlayers} correct.`);
        $('.playerName').css('font-size', '2rem');

    }

    // function for start game 
    gameApp.beginGame = function() {
        $('.startGame').on('click', function(event) {
            event.preventDefault();
            location.replace('game.html');
            
        });
    }




  






