const gameboard = (function() {
    const grid = ["","","","","","","","",""];

    const setMarker = (player, selection) => {
        if (selection !== "") grid[selection] = player.marker;
    }

    return { grid, setMarker };
})();


function player(name="") {
    let marker = name !== "computer" ? "x" : "o";
    let markerCount = 0;

    const incMarkerCount = () => {
        if (markerCount < 3) markerCount++;
    };

    return { marker, incMarkerCount };
}


const game = (function() {

})();


const displayController = (function() {
    const spaces = document.querySelectorAll(".space");


})();
