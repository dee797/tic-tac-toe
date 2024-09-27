const gameboard = (function() {
    const grid = Array.from(document.querySelectorAll(".space"));

    const setMarker = (player, selection) => {
        if (grid[selection].textContent === "") { 
            grid[selection].textContent = player.marker;
            game.incTurn();
        }
        else alert("This spot has already been taken.");
    }

    return { grid, setMarker };
})();



function player(playerNum, name="") {
    let marker = playerNum === 1 ? "X" : "O";

    if (name === null || name === "") name = `Player ${playerNum}`;

    return { playerNum, name, marker };
}



const game = (function() {
    
    const player1 = player(1, prompt("Player 1 - You will go first and have 'X' markers.\nPlease enter your name:"));
    const player2 = player(2, prompt("Player 2 - You will have 'O' markers.\nPlease enter your name:"));

    let turnCount = 1;
    let currentplayer;

    const incTurn = () => turnCount++;
    
    const checkWin = () => {

        const winningPatterns = [gameboard.grid.slice(0,3), gameboard.grid.slice(3,6), gameboard.grid.slice(6),
            [gameboard.grid[0], gameboard.grid[3], gameboard.grid[6]], 
            [gameboard.grid[1], gameboard.grid[4], gameboard.grid[7]],
            [gameboard.grid[2], gameboard.grid[5], gameboard.grid[8]],
            [gameboard.grid[0], gameboard.grid[4], gameboard.grid[8]],
            [gameboard.grid[2], gameboard.grid[4], gameboard.grid[6]]
        ];

        let endGame = false;

        for (const pattern of winningPatterns) {
            if (pattern.every(value => value.textContent === currentplayer.marker)) {
                
                alert(`${currentplayer.name} wins!`);
                pattern.forEach(value => value.style.color = "red");
                endGame = true;
                break;

            } else if (gameboard.grid.every(value => value.textContent !== "") && winningPatterns[7] === pattern) {
                alert("It's a tie!");
                endGame = true;
            }
        } 
        
        
    };


    for (const space of gameboard.grid) {
        space.addEventListener("click", e => {
            const spaceID = space.id;

            turnCount % 2 !== 0 ? 
            currentplayer = player1 :
            currentplayer = player2;

            gameboard.setMarker(currentplayer, spaceID);

            checkWin();
        });
    }

    return { player1, player2, incTurn };

})();



const displayController = (function() {
    const displayMarker = () => {

    }

    return { displayMarker };
})();


// IIFE instantly executes code within factory function,
// no need to instantiate object outside of definition
