const gameboard = (function() {
    let grid = ["","","",
                "","","",
                "","",""];

    const setMarker = (player, selection) => {
        grid[selection] === "" ? 
        grid[selection] = player.marker : 
        alert("This spot has already been taken.");
    }

    return { grid, setMarker };
})();



function player(playerNum, name="") {
    let marker = playerNum === 1 ? "x" : "o";
    let markerCount = 0;

    const incMarkerCount = () => {
        if (markerCount < 3) markerCount++;
    };

    return { playerNum, name, marker, incMarkerCount };
}



const game = (function() {
    
    const player1 = player(1, prompt("Player 1 - You will go first and have 'x' markers.\nPlease enter your name:"));
    const player2 = player(2, prompt("Player 2 - You will have 'o' markers.\nPlease enter your name:"));

    const spaces = document.querySelectorAll(".space");

    let turnCount = 1;
    let currentplayer;
    
    const checkWin = () => {
        if (gameboard.grid.slice(0,3).every(value => value === currentplayer.marker) ||
            gameboard.grid.slice(3,6).every(value => value === currentplayer.marker) ||
            gameboard.grid.slice(6).every(value => value === currentplayer.marker) ||

            [gameboard.grid[0], gameboard.grid[3], gameboard.grid[6]].every(value => value === currentplayer.marker) ||
            [gameboard.grid[1], gameboard.grid[4], gameboard.grid[7]].every(value => value === currentplayer.marker) ||
            [gameboard.grid[2], gameboard.grid[5], gameboard.grid[8]].every(value => value === currentplayer.marker) ||

            [gameboard.grid[0], gameboard.grid[4], gameboard.grid[8]].every(value => value === currentplayer.marker) ||
            [gameboard.grid[2], gameboard.grid[4], gameboard.grid[6]].every(value => value === currentplayer.marker)) {

                alert(`Player ${currentplayer.playerNum} wins!`);
            }
        else if (gameboard.grid.every(value => value !== "")) {
                alert("It's a tie!");
        } else {
                turnCount++;
        }
    };


    for (const space of spaces) {
        space.addEventListener("click", () => {
            const spaceID = space.id;

            turnCount % 2 !== 0 ? 
            currentplayer = player1 :
            currentplayer = player2;

            gameboard.setMarker(currentplayer, spaceID);

            displayController.displayMarker();

            checkWin();
        });
    }

    return { player1, player2, spaces };

})();



const displayController = (function() {
    const displayMarker = () => {

        for (let i = 0; i < gameboard.grid.length; i++) {

            //set markers based on gameboard.grid elements
            if (gameboard.grid[i] === "x") game.spaces[i].textContent = "X";
            else if (gameboard.grid[i] === "o") game.spaces[i].textContent = "O";
            
        }
    }

    return { displayMarker };
})();


// IIFE instantly executes code within factory function,
// no need to instantiate object outside of definition
