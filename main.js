var prompt = require('prompt');
var Word = require('./word.js');

prompt.start();

game = {
  wordBank : ['Dark Souls', 'Final Fantasy', 'Kingdom Hearts', 'Dead Space', 'Overwatch'],
  wordsWon: 0,
  guessesRemaining: 10,
  currentWrd: null,
  startGame : function(wrd) {
    this.resetGuessesRemaining();

    this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);

    this.currentWrd.getLets();

    this.keepPromptingUser();
  },
  resetGuessesRemaining : function(){
    this.guessRemaining = 10;
  },
  keepPromptingUser : function() {
    var self = this;

    prompt.get(['guessLetter'], function(err, result) {
      console.log(' The letter or space you guessed is: ' + result.guessLetter);

      var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);
      if (findHowManyOfUserGuess == 0) {
        console.log('You guessed wrong!');
      } else {
        console.log('You guessed right');

        if (self.currentWrd.didWeFindTheWord()){
          console.log('You won!!!');
          return;
        }
      }
      console.log('Guessed remaining: ', self.guessesRemaining);
      console.log(self.currentWrd.wordRender());
      console.log('here are the guesses you guessed already');

      if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)) {
        self.keepPromptingUser();
      } else if (self.guessesRemaining == 0) {
        console.log('Game over it was: ', self.currentWrd.word);
        console.log('Get with the program man');
      } else {
        console.log(self.currentWrd.wordRender());
      }
    });
  }

};

game.startGame();
