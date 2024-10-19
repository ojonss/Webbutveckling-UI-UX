function initializeMap() {
    const width = parseInt(document.getElementById("gridWidth").value, 10);
    const height = parseInt(document.getElementById("gridHeight").value, 10);

    // Create the full map
    const fullMap = new MapPlacement(width, height);

    const apa = document.querySelector('.generateMenu');
    apa.classList.add('hidden');


    // Game starts here
    new Movement(fullMap);
}