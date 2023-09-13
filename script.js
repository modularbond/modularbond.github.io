
const scrambleChars = "❙❚❘";
const targetText1 = "modular";
const targetText2 = "bond";
const durationPerLetter = 40;  // Duration to unscramble each letter (in milliseconds)

const word1Element = document.getElementById("word1");
const word2Element = document.getElementById("word2");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function scrambleText(target, revealedCount) {
  let scrambled = "";
  for (let i = 0; i < target.length; i++) {
    if (i < revealedCount) {
      scrambled += target[i];
    } else {
      scrambled += scrambleChars[randomInt(0, scrambleChars.length - 1)];
    }
  }
  return scrambled;
}

function unscramble(wordElement, targetText, revealedCount) {
  if (revealedCount > targetText.length) {
    return;
  }
  wordElement.textContent = scrambleText(targetText, revealedCount);
  setTimeout(() => {
    unscramble(wordElement, targetText, revealedCount + 1);
  }, durationPerLetter);
}

word1Element.textContent = scrambleText(targetText1, 0);
word2Element.textContent = scrambleText(targetText2, 0);

// Start the unscrambling process
setTimeout(() => {
  unscramble(word1Element, targetText1, 0);
}, 100);  // Initial delay before starting to unscramble

setTimeout(() => {
  unscramble(word2Element, targetText2, 0);
}, 100);  // Initial delay before starting to unscramble

