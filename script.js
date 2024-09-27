const gameboard = (function() {
    const grid = ["","","","","","","","",""];

    const setMarker = (player, selection) => {
        selection !== "" ? 
        grid[selection] = player.marker : 
        alert("This spot has already been taken.");
    }

    return { grid, setMarker };
})();



function player(playerNum, name="") {
    let marker = playerNum === "1" ? "x" : "o";
    let markerCount = 0;

    const incMarkerCount = () => {
        if (markerCount < 3) markerCount++;
    };

    return { playerNum, name, marker, incMarkerCount };
}



const game = (function() {
    
    const player1 = player(1, prompt("Player 1 - You will have 'x' markers.\n Please enter your name:"));
    const player2 = player(2, prompt("Player 2 - You will have 'o' markers.\n Please enter your name:"));

    const spaces = document.querySelectorAll(".space");

    const turnCount = 1;
    

    for (const space of spaces) {
        space.addEventListener("click", () => {
            const spaceID = space.id;
            turnCount % 2 !== 0 ? 
            gameboard.setMarker(player1, spaceID) :
            gameboard.setMarker(player2, spaceID);
            displayController.displayMarker();
            turnCount++;
        });
    }

    return { player1, player2, spaces };

})();



const displayController = (function() {
    const displayMarker = () => {

        for (let i = 0; i < gameboard.grid.length; i++) {
            const bigX = "\u00D7";

            gameboard.grid[i] === "x" ?
            game.spaces[i].textContent = bigX :
            game.spaces[i].textContent = "O";
        }
        //set markers based on gameboard.grid
    }

    return { displayMarker };
})();

// IIFE instantly executes code in function,
// no need to instantiate object outside of definition
