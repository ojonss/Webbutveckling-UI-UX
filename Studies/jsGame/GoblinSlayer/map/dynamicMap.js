function initializeMap() {
    //10an betyder att vi använder den vanliga talbasen 0-9
    const width = parseInt(document.getElementById("gridWidth").value, 10);
    const height = parseInt(document.getElementById("gridHeight").value, 10);

    if (width < 9 || height < 9) {
        alert("Min mapsize is 9x9")
    }
    else {
        // Create the full map
        const fullMap = new MapPlacement(width, height);

        const showPlayerInfo = document.querySelector('.grid-container-info');
        showPlayerInfo.classList.remove('hidden');
        const hideMainMenu = document.querySelector('.generateMenu');
        hideMainMenu.classList.add('hidden');
        document.getElementById("grid-container").classList.remove("hidden");


        // Game starts here
        new Movement(fullMap);
    }

}