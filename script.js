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
  boolsAndCowsQty.bools = bools
  boolsAndCowsQty.cows = cows
  return `Bools: ${bools} Cows: ${cows}`;
}
let dificulty = 3;
let answer = numGenerator(dificulty);
let guess 
let message
const boolsAndCowsQty = {
  bools: 0,
  cows: 0,
} 
window.addEventListener('load', function (){
  document.querySelector('.check').addEventListener('click', function () { 
  guess = document.querySelector('.guess').value
  message =  countBoolsAndCows(guess)
  console.log(answer, guess, message)
})})
