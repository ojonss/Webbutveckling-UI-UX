function initializeMap() {
    const width = parseInt(document.getElementById("gridWidth").value, 10);
    const height = parseInt(document.getElementById("gridHeight").value, 10);

    // Create the full map
    const fullMap = new MapPlacement(width, height);

    // Initialize movement
    new Movement(fullMap);
}


/*function createGrid(gridWidth, gridHeight) {
    const gridContainer = document.getElementById("grid-container");

    // Clear any existing grid
    gridContainer.innerHTML = "";
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;

    // Generate grid cells
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            gridContainer.appendChild(cell);
        }
    }
}*/
/*
function createPlayerGrid(gridWidth, gridHeight){
    const gridContainer = document.getElementById("grid-container");

    gridContainer.innerHTML = "";
    gridContainer.style.display = "grid";

    gridContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            gridContainer.appendChild(cell);
        }
    }
}

function initializeMap(x, y) {
    const width = parseInt(document.getElementById("gridWidth").value, 10);
    const height = parseInt(document.getElementById("gridHeight").value, 10);

    /*createGrid(width, height);--------------
    createPlayerGrid(x, y)
    const mapPlacement = new MapPlacement(width, height);
}*/
