const checkBtn = document.querySelector(".check");
const guessInput = document.querySelector(".guess");
const messageOutput = document.querySelector(".message");
const againBtn = document.querySelector(".again");
const dificultyBtns = document.querySelectorAll(".dificulty");
const history = document.querySelector(".history");
const hightscoreOutput = document.querySelector(".hightscore");
const guessLength = document.querySelector(".guessLength");

let dificulty = 3;
let answer = numGenerator(dificulty);
console.log(answer);
let guess;
let message;
let hightscore = 999;
let score = 0;
const boolsAndCowsQty = {
  bools: 0,
  cows: 0,
};

function numGenerator(length) {
  let generated = "";
  for (let i = 0; i < length; i++) {
    let num = Math.trunc(Math.random() * 10);
    while (generated.indexOf(`${num}`) !== -1) {
      num = Math.trunc(Math.random() * 10);
    }
    generated = generated + String(num);
  }
  return generated;
}

function inputValidator(input) {
  if (input.length === dificulty) {
    for (let i = 0; i < dificulty; i++) {
      let counter = 0;
      for (let j = 0; j < dificulty; j++) {
        if (input[i] === input[j]) counter++;
      }
      if (counter !== 1) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function countBoolsAndCows(guess) {
  let bools = 0;
  let cows = 0;
  for (let i = 0; i < dificulty; i++) {
    if (answer.indexOf(guess[i]) !== -1) {
      if (answer.indexOf(guess[i]) === i) {
        bools++;
        continue;
      }
      cows++;
    }
  }
  boolsAndCowsQty.bools = bools;
  boolsAndCowsQty.cows = cows;
  return `Bools: ${bools} Cows: ${cows}`;
}

function updateHistory(message) {
  messageOutput.textContent = message;
  history.textContent = history.textContent + guess + " " + message + "\n";
  guessInput.value = null;
}

function endGame() {
  messageOutput.textContent = `You win! It's ${answer}!`;
  if (hightscore > score + 1) {
    hightscore = score + 1;
    hightscoreOutput.textContent = `Hightscore: ${hightscore}`;
  }

  guessInput.value = null;
  checkBtn.setAttribute("disabled", "true");
}

function restart() {
  guessLength.textContent = `Guess ${dificulty} digit number`;
  guessInput.value = null;
  checkBtn.removeAttribute("disabled");
  messageOutput.textContent = "Start guessing";
  history.textContent = "";
  answer = numGenerator(dificulty);
  console.log(answer);
  score = 0;
}

function changeDificulty(newDificulty) {
  dificulty = newDificulty;
  restart();
  hightscoreOutput.textContent = "Hightscore: - ";
}

checkBtn.addEventListener("click", function () {
  const inputValue = guessInput.value;
  if (inputValidator(inputValue)) {
    guess = inputValue;
  } else {
    messageOutput.textContent = `Wrong input. Send ${dificulty} didgit number`;
    guessInput.value = null;
    return;
  }
  message = countBoolsAndCows(guess);
  if (boolsAndCowsQty.bools !== dificulty) {
    updateHistory(message);
    score++;
  }
  if (boolsAndCowsQty.bools === dificulty) {
    endGame();
  }
});
againBtn.addEventListener("click", function () {
  restart();
});
for (i = 0; i < dificultyBtns.length; i++) {
  dificultyBtns[i].addEventListener("click", function (btn) {
    changeDificulty(Number(btn.target.id));
  });
}
