// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3,
    wallet = 21,
    stake = 0;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      walletAmount = document.getElementById('wallet-amount');
      stakeAmount = document.getElementById('stake-amount');

// Assign UI start values
minNum.textContent = min;
maxNum.textContent = max;
walletAmount.textContent = wallet;
stakeAmount.value = stake;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Stake amount edited listener
stakeAmount.addEventListener('blur', stakeAmountChanged);
      
// Listen for guess
guessBtn.addEventListener('click', function(){
  // check if stake added
  if (isNaN(stake) || stake === 0) {
    return setMessage(`Please enter a stake`, 'red');
  }

  let guess = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    // empty the wrong value - should be moved to different plase??
    guessInput.textContent = '';
    return setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  stakeSub(stake);

  // Check if won
  if(guess === winningNum){
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell user if its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// subtract the stake from wallet
function stakeSub(stake) {
  wallet -= stake;
  walletAmount.textContent = wallet;
}

function stakeAmountChanged() {
  const stakeInput = stakeAmount.value;
  if (!isNaN(stakeInput) && stakeInput > 0 && stakeInput <= wallet) {
    stake = stakeInput;
  } else {
    // stake not possible message
  }
}

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // PLay Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}