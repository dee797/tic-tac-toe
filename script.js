const gameboard = (function() {
    const grid = Array.from(document.querySelectorAll(".space"));

    const setMarker = (player, selection) => {
        if (grid[selection].textContent === "") { 
            grid[selection].textContent = player.marker;
            return true;
        }
        else {
            alert("This spot has already been taken.");
            return false;
        }
    }

    return { grid, setMarker };
})();



function player(playerNum, name="") {
    let marker = playerNum === 1 ? "X" : "O";

    if (name === null || name === "") name = `Player ${playerNum}`;

    return { name, marker };
}



const game = (function() {
    
    const player1 = player(1, prompt("Player 1 - You will go first and have 'X' markers.\nPlease enter your name:"));
    const player2 = player(2, prompt("Player 2 - You will have 'O' markers.\nPlease enter your name:"));

    let currentplayer = player1;
    let endGame = false;

    const getCurrentPlayerName = () => currentplayer.name;
    const getPlayer1Name = () => player1.name;
    const getPlayer2Name = () => player2.name;

    const changeCurrentPlayer = () => {
        currentplayer = currentplayer === player1 ? player2 : player1;
    };
    
    const checkWin = () => {

        const winningPatterns = [gameboard.grid.slice(0,3), gameboard.grid.slice(3,6), gameboard.grid.slice(6),
            [gameboard.grid[0], gameboard.grid[3], gameboard.grid[6]], 
            [gameboard.grid[1], gameboard.grid[4], gameboard.grid[7]],
            [gameboard.grid[2], gameboard.grid[5], gameboard.grid[8]],
            [gameboard.grid[0], gameboard.grid[4], gameboard.grid[8]],
            [gameboard.grid[2], gameboard.grid[4], gameboard.grid[6]]
        ];

        for (const pattern of winningPatterns) {
            if (pattern.every(value => value.textContent === currentplayer.marker)) {
                
                alert(`${currentplayer.name} wins!`);
                pattern.forEach(value => value.style.color = "red");
                displayController.displayWinner();
                endGame = true;
                break;

            } else if (gameboard.grid.every(value => value.textContent !== "") && winningPatterns[7] === pattern) {
                alert("It's a tie!");
                endGame = true;
            }
        }

        if (endGame) return true;
        else return false;

        
    };


    for (const space of gameboard.grid) {
        space.addEventListener("click", e => {
            if (!endGame) {
                const spaceID = space.id;

                const setMarker = gameboard.setMarker(currentplayer, spaceID);

                const isWinner = checkWin();

                if (!isWinner && setMarker) {
                    changeCurrentPlayer();
                    displayController.displayTurn();
                }

            } else e.preventDefault();
        });
    }

    return { getPlayer1Name, getPlayer2Name, getCurrentPlayerName };

})();



const displayController = (function() {
    const displayNames = () => {
        document.querySelector("#nameContainer1").textContent = `${game.getPlayer1Name()}: Has 'X' markers`;
        document.querySelector("#nameContainer2").textContent = `${game.getPlayer2Name()}: Has 'O' markers`;
    }

    const displayTurn = () => {
        document.querySelector("#currentTurn").textContent = `${game.getCurrentPlayerName()}'s`;
    }

    const displayWinner = () => {
        document.querySelector("#status").textContent = `${game.getCurrentPlayerName()} wins!`;
        document.querySelector("#status").style.fontWeight = "bold";
    }

    return { displayNames, displayTurn, displayWinner };
})();



displayController.displayNames();
displayController.displayTurn();

// IIFE instantly executes code within factory function,
// no need to instantiate object outside of definition
