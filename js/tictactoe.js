// Keep track of whose turn it is.
let activePlayer = 'X';
// Array stores and array of moves. Determines win conditions.
let selectedSquares = [];

// Function for placing x's anmd o's
function placeXOrO(squareNumber) {
    // This condition ensures a square hasn't been selected already.
    // The . some() method is used to check each element of the selectSquare array
    // to see if it contains the square number clicked on .
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // This variable retrieves the HTML element id that was clicked
        let select = document.getElementById(squareNumber);
        // This condition checks who's turn it is
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("images/x.jpg")';
            // Active player may only be 'X' or 'O' so, if not 'X' must be 'O'
        } else {
            // If activePlayer is equal to 'O', the o.png is plaved in HTML
            select.style.backgroundImage = 'url("images/o.jpg")';
        }
        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        // This calls a function to check for any wind conditions.
        checkWinConditions();
        // This condition is for changing the active player
        if (activePlayer === 'X') {
            // if active player is 'X' change to 'O'
            activePlayer = 'O';
            // If active player is anthing other than 'X'
        } else {
            // Change the activePlayer to 'X'
            activePlayer = 'X';
        }
        // This function plays placement sound.
        // -------------------------------------------Added a condition to play different sounds based on active player
        if (activePlayer == 'X') {
            audio('./Media/bam.mp3');
        } else {
            audio('./Media/ohh.mp3');
        }

        // This condition checks to see if it is the computers turn.
        if (activePlayer === 'O') {
            // This function disables clicking on comp turn.
            disableClick();
            // This function waits 1 second before the computer places an img and enables click
            setTimeout(function () { computersTurn(); }, 1000);
        }
        // returning true is needed for our computersTurn() function to work.
        return true;
    }
    // This function results in a random square being selected byu the computer.
    function computersTurn() {
        // This bool is needed for our while loop.
        let success = false;
        // this variable stores a random number 0-8
        let pickASquare;
        // This condition allows while loop to keep trying if a square is already selected
        while (!success) {
            // A random number between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            // If the random number evaluated returns true, the square hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                // This line calls the function
                placeXOrO(pickASquare);
                // This changes our bool and ends loop
                success = true;
            };
        }
    }
}

// This function parses the selectedSquares array to search for win conditions.
// drawLines() function is called to draw a line on the screen if the condition is met.
function checkWinConditions() {
    // x 0, 1, 2 condition
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    // x 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    // X 1, 4, 7 condition
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    // X 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }
    // ------- ZERO THEN OH ------
    // O 0, 1, 2 condition
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }
    // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
    // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
    // O 1, 4, 7 condition
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    // O 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 358) }
    // O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    // O 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }
    // This condition checks for a tie. If none of the above conditions are met and
    // 9 squares are selevted the code executes.
    else if (selectedSquares.length >= 9) {
        // This function plays the tie game sound.
        audio('./media/bruhTie.mp3');
        // This function sets a .3 second timer before the resetGame is called.
        setTimeout(function () { resetGame(); }, 300);
    }
    // This function checks if an array includes 3 strings. It is used to check for
    // Each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        // These 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If the 3 variables we pass are all included in our array then
        // true is returned and our else if condition executes the drawLines() function.
        if (a === true && b === true && c === true) { return true; }
    }

}

// This function makes our body element temporarily unclickable.
// This function is for every other turn
function disableClick() {
    // This makes body unclickable.
    body.style.pointerEvents = 'none';
    // This makes our body clickable after 1 second.
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

// This function makes our body element temp unclickable but only after game over
function disableClickGameEnd() {
    // This makes body unclickable.
    body.style.pointerEvents = 'none';
    // This makes our body clickable after 1 second.
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 5000);
}

// This function takes a string parameter of the path you set earlier for 
// placement sound ('./media/place.mp3')
function audio(audioURL) {
    // We create a new audio object and we pass the path as a parameter.
    let audio = new Audio(audioURL);
    // Play method plays our audio.
    audio.play();
}
// This function utilizes HTML canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // This line access our html canvas element.
    const canvas = document.getElementById('win-lines');
    // This line gives us access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    // This line indicates where the start of a lines x axis is.
    let x1 = coordX1,
        // Start of lines y axis
        y1 = coordY1,
        // end of lines x axis
        x2 = coordX2,
        // end of lines y axis 
        y2 = coordY2,
        // variable stores temp x axis data we update in animation loop
        x = x1,
        // same thing for y axis data
        y = y1;

    // This function interacts with the canvas.
    function animateLineDrawing() {
        // create loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // Clears content from the last loop iteration
        c.clearRect(0, 0, 608, 608);
        // This method starts new path
        c.beginPath();
        // moves us to a starting point in our line
        c.moveTo(x1, y1);
        // indicates the end point in our line
        c.lineTo(x, y);
        //  line width
        c.lineWidth = 10;
        // sets color of line
        c.strokeStyle = 'rgba(70, 255, 33, 0.8)';
        // draws everything we laid out
        c.stroke();
        // This condition checks if we've reached the endpoints.
        if (x1 <= x2 && y1 <= y2) {
            // This condition adds 10 to the previous end x endpoint
            if (x < x2) { x += 10; }
            // This condition adds 10 to previous end y endpoint
            if (y < y2) { y += 10; }
            // Condition similar to above
            // this is necessart for the 6, 4, 2 win cons
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
        // Similar to above condition
        // necessary for the 6, 4, 2 win con
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }
    // Function clears our canvas after our win line is drawn.
    function clear() {
        // Starts animation loop
        const animationLoop = requestAnimationFrame(clear);
        // line clears our canvas
        c.clearRect(0, 0, 608, 608);
        // stops animation loop
        cancelAnimationFrame(animationLoop);
    }
    // This line disallows clicking while the win sound is playing
    disableClickGameEnd();
    // Audio plays the win sound
    audio('./Media/winRR.mp3');
    // calls our main animation loop
    animateLineDrawing();
    // This line waits 5 seconds. Then, clears canvas, resets game, and allows clicking again. 
    setTimeout(function () { clear(); resetGame(); }, 5100);
}
// this function resets the game in the even of a tie or a win
function resetGame() {
    // loop iterates through each HTML square ele
    for (let i = 0; i < 9; i++) {
        // Variable gets HTML ele
        let square = document.getElementById(String(i));
        // This removes our ele brackgroundImage
        square.style.backgroundImage = '';
    }
    // This resets our array so it is empty and we can start over
    selectedSquares = [];
}





//  !!!!!!!!!!! Line is not drawing !!!!!!!!!!!!