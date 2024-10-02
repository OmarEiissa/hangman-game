// Letters
let letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

function createSpan(text, className) {
  let span = document.createElement("span");
  span.textContent = text;
  if (className) {
    span.classList.add(className);
  }
  return span;
}

lettersArray.forEach((letter) => {
  let letterSpan = createSpan(letter, "letter-box");
  lettersContainer.appendChild(letterSpan);
});

// Fetch categories from JSON file
fetch("../json/categories.json")
  .then((res) => res.json())
  .then((words) => {
    // Get Random Property
    let allKeys = Object.keys(words);

    // Random Number Depend On Keys Length
    let randomPropNumber = Math.floor(Math.random() * allKeys.length);

    // Category
    let randomPropName = allKeys[randomPropNumber];

    // Category Words
    let randomPropValue = words[randomPropName];

    // Random Number Depend On Words
    let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

    // The Chosen Word
    let randomValueValue = randomPropValue[randomValueNumber];

    // Set Category Info
    document.querySelector(".game-info .category span").innerHTML =
      randomPropName;

    // Select Letters Guess Element
    let letterGuessContainer = document.querySelector(".letter-guess");

    // Convert Chosen Word To Array
    let lettersAndSpace = Array.from(randomValueValue);

    // Create Spans Based On Word
    lettersAndSpace.forEach((letter) => {
      let spanClass = letter === " " ? "has-space" : "empty";
      let letterSpan = createSpan(letter === " " ? "" : "_", spanClass);
      letterGuessContainer.append(letterSpan);
    });

    // Select Guess Spans
    let guessSpans = document.querySelectorAll(".letter-guess span");

    // Set Wrong Attempts
    let wrongAttempts = 0;
    let correctLettersFound = new Set(); // Track correctly guessed letters

    // Select The Draw Element
    let theDraw = document.querySelector(".hangman-draw");

    // Handle Clicking On Letters using Event Delegation
    lettersContainer.addEventListener("click", (e) => {
      // Check if clicked element is a letter box
      if (e.target.classList.contains("letter-box")) {
        e.target.classList.add("clicked");

        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        let theStatus = false; // Set The Chosen Status

        theChosenWord.forEach((wordLetter, wordIndex) => {
          // If The Clicked Letter Equals To One Of The Chosen Word Letter
          if (theClickedLetter === wordLetter) {
            // Set Status To Correct
            theStatus = true;

            // Add letter to correctLettersFound Set
            correctLettersFound.add(theClickedLetter);

            // Loop On All Guess Spans
            guessSpans.forEach((span, spanIndex) => {
              if (wordIndex === spanIndex) {
                span.innerHTML = theClickedLetter;
              }
            });
          }
        });

        // If Letter Is Wrong
        if (!theStatus) {
          // Increase The Wrong Attempts
          wrongAttempts++;

          // Add Class Wrong On The Draw Element
          theDraw.classList.add(`wrong-${wrongAttempts}`);

          // Play Fail Sound
          document.querySelector("#fail").play();

          if (wrongAttempts === 8) {
            endGame(randomValueValue);
            lettersContainer.classList.add("finished");
          }
        } else {
          // Play Success Sound
          document.querySelector("#success").play();

          // Check if all letters have been guessed
          if (correctLettersFound.size === new Set(theChosenWord).size) {
            congrats(randomValueValue);
          }
        }
      }
    });

    // End Game Function
    function endGame(word) {
      // Create Overlay
      let overlay = document.createElement("div");
      overlay.className = "overlay";

      // Create Popup Div
      let div = document.createElement("div");

      // Create Text using innerHTML for span
      div.innerHTML = `
      <span class="bad">Game Over,</span> 
      <span class="text">The Word Is</span>
      <span class="word-container">( <span class="word">${word}</span> )</span>
      `;

      // Create Button
      let btn = document.createElement("button");

      // Add text to button
      btn.innerHTML = "Try Again";

      // Append button to Div
      div.appendChild(btn);

      // Add Class On Div
      div.className = "popup bad";

      // Append Popup to Overlay
      overlay.appendChild(div);

      // Append Overlay To The Body
      document.body.appendChild(overlay);

      btn.addEventListener("click", () => {
        window.location.reload();
      });
    }

    // Congratulate on Success
    function congrats(word) {
      // Create Overlay
      let overlay = document.createElement("div");
      overlay.className = "overlay";

      // Create Popup Div
      let div = document.createElement("div");

      // Set innerHTML to include span
      div.innerHTML = `
      <span class="good">Congrats!</span>
      <span class="text">You guessed</span>
      <span class="word-container">( <span class="word">${word}</span> )</span>
      `;

      // Create Button
      let btn = document.createElement("button");

      // Add text to button
      btn.innerHTML = "Play Again";

      // Append button to Div
      div.appendChild(btn);

      // Add Class On Div
      div.className = "popup good";

      // Append Popup to Overlay
      overlay.appendChild(div);

      // Append Overlay To The Body
      document.body.appendChild(overlay);

      btn.addEventListener("click", () => {
        window.location.reload();
      });
    }
  });
