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
      // Create Empty Span
      let emptySpan = document.createElement("span");
      emptySpan.classList.add("empty");
      emptySpan.textContent = "_";

      // If Letter Is Space
      if (letter === " ") {
        // Add Class To The Span
        emptySpan.className = "has-space";
        emptySpan.textContent = "";
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
          // if The Clicked Letter Equals To One Of The Chosen Word Letter
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

        // If Letter Is Wrong
        if (!theStatus) {
          // Increase The Wrong Attempts
          wrongAttempts++;

          // Add Class Wrong On The Draw Element
          theDraw.classList.add(`wrong-${wrongAttempts}`);

          // Play Fail Sound
          document.querySelector("#fail").play();

          if (wrongAttempts === 1) {
            endGame(randomValueValue);
            lettersContainer.classList.add("finished");
          }
        } else {
          // Play Success Sound
          document.querySelector("#success").play();
        }

        // If all correct letters have been guessed
        if (theStatus) {
          good++;

          if (good === theChosenWord.length) {
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
      <span  class="word-container">( <span class="word">${word}</span> )</span>
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
      <span  class="word-container">( <span class="word">${word}</span> )</span>
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
