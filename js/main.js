// Letters
let letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
let words = {
  programming: ["python", "javascript"],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Gandhi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letter-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Deepened On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  emptySpan.classList.add("empty");

  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "has-space";
  }

  // Append Span To The Letters Guess Container
  letterGuessContainer.append(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letter-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

let good = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // if The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // Outside Loop

    // If Letter Is Wrong
    if (theStatus === false) {
      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.querySelector("#fail").play();

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.querySelector("#success").play();
    }

    // i make

    if (theStatus === true) {
      good++;

      let empty = document.querySelector(".empty");

      empty.classList.add(`good-${good}`);

      if (good === theChosenWord.length) {
        congrats();
      }
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word Is ( ${randomValueValue} )`
  );

  // createBtn
  let btn = document.createElement("button");

  // Append Text To Div
  div.appendChild(divText);

  // add text in btn
  btn.innerHTML = "Try Agien";

  // Append btn To Div
  div.appendChild(btn);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);

  btn.addEventListener("click", () => {
    window.location.reload();
  });
}

function congrats() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`congrats ${randomValueValue}`);

  // createBtn
  let btn = document.createElement("button");

  // Append Text To Div
  div.appendChild(divText);

  // add text in btn
  btn.innerHTML = "Play Agien";

  // Append btn To Div
  div.appendChild(btn);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);

  btn.addEventListener("click", (btn) => {
    window.location.reload();
  });
}
