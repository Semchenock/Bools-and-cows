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
  document.querySelector(".message").textContent = message;
  document.querySelector(".history").textContent =
    document.querySelector(".history").textContent +
    guess +
    " " +
    message +
    "\n";
  document.querySelector(".guess").value = null;
}
function endGame() {
  document.querySelector(".message").textContent = `You win! It's ${answer}!`;
  if (hightscore > score + 1) {
    hightscore = score + 1;
    document.querySelector(
      ".hightscore"
    ).textContent = `Hightscore: ${hightscore}`;
  }

  document.querySelector(".guess").value = null;
  document.querySelector(".check").setAttribute("disabled", "true");
}
function restart() {
  document.querySelector(
    ".guessLength"
  ).textContent = `Guess ${dificulty} digit number`;
  document.querySelector(".guess").value = null;
  document.querySelector(".check").removeAttribute("disabled");
  document.querySelector(".message").textContent = "Start guessing!";
  document.querySelector(".history").textContent = "";
}
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
window.addEventListener("load", function () {
  document.querySelector(".check").addEventListener("click", function () {
    const inputValue = document.querySelector(".guess").value;
    if (inputValue.length === dificulty) {
      guess = inputValue;
    } else {
      document.querySelector(
        ".message"
      ).textContent = `Wrong input. Send ${dificulty} didgit number`;
      document.querySelector(".guess").value = null;
      return;
    }
    message = countBoolsAndCows(guess);
    if (boolsAndCowsQty.bools !== 3) {
      updateHistory(message);
      score++;
    }
    if (boolsAndCowsQty.bools === 3) {
      endGame();
    }
  });
  document.querySelector(".again").addEventListener("click", function () {
    restart();
    answer = numGenerator(dificulty);
    console.log(answer);
    score = 0;
  });
  document
    .querySelector(".dificulty")
    .addEventListener("click", function (btn) {
      dificulty = btn.id;
      console.log(dificulty);
    });
});
