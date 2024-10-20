class Movement {
    constructor(map, playerGridSize = 9) {
        this.map = map;
        this.playerGridSize = playerGridSize;
        this.playerPosition = [
            Math.floor(map.fullWidth / 2),
            Math.floor(map.fullHeight / 2)
        ];

        this.inCombat = false;
        this.updateViewport();

        this.player = new Player();
        document.addEventListener("keydown", (event) => this.handleMovement(event));
    }

    updateViewport() {
        const [playerX, playerY] = this.playerPosition;
        const halfGrid = Math.floor(this.playerGridSize / 2);
    
        const gridContainer = document.getElementById("grid-container");
        gridContainer.innerHTML = "";
        gridContainer.style.gridTemplateColumns = `repeat(${this.playerGridSize}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${this.playerGridSize}, 1fr)`;
    
        for (let y = 0; y < this.playerGridSize; y++) {
            for (let x = 0; x < this.playerGridSize; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
    
                // Calculate the actual map coordinates, clamping them within map boundaries
                let mapX = playerX - halfGrid + x;
                let mapY = playerY - halfGrid + y;
    
                // Adjust mapX and mapY to not go out of bounds (clamp within the full map size)
                if (mapX < 0) mapX = 0;
                if (mapX >= this.map.fullWidth) mapX = this.map.fullWidth - 1;
                if (mapY < 0) mapY = 0;
                if (mapY >= this.map.fullHeight) mapY = this.map.fullHeight - 1;
    
                // If the coordinates are out of bounds, add the hidden class
                if (mapX < 0 || mapX >= this.map.fullWidth || mapY < 0 || mapY >= this.map.fullHeight) {
                    cell.classList.add("hidden");
                } else {
                    // If the player is at the center of the grid, mark it
                    if (x === halfGrid && y === halfGrid) {
                        cell.classList.add("player-position");
                    }
    
                    // Get the item at the specific map coordinates
                    const item = this.map.getItemAtPosition(mapX, mapY);
                    if (item) {
                        cell.classList.add(item + "-position");
                    }
                }
    
                gridContainer.appendChild(cell);
            }
        }
    }

    handleMovement(event) {
        if (this.inCombat) {
            return;
        }

        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;
        const LEFT = 37;

        let [x, y] = this.playerPosition;

        switch (event.which) {
            case UP:
                y = Math.max(0, y - 1);
                break;
            case DOWN:
                y = Math.min(this.map.fullHeight - 1, y + 1);
                break;
            case LEFT:
                x = Math.max(0, x - 1);
                break;
            case RIGHT:
                x = Math.min(this.map.fullWidth - 1, x + 1);
                break;
            default:
                return;
        }

        const encounteredItem = this.map.getItemAtPosition(x, y);

        if (encounteredItem === null) {
            this.playerPosition = [x, y];
            this.updateViewport();
        } else if (encounteredItem === "wall") {
            console.log("Can't move there, wall.");
        } else if (encounteredItem === "merchant") {
            this.playerPosition = [x, y];
            this.updateViewport();
        } else if (encounteredItem === "loot") {
            this.playerPosition = [x, y];
            this.updateViewport();
        } else if (encounteredItem === "enemy") {
            this.playerPosition = [x, y];
            this.updateViewport();
            this.startCombat();
        } else {
            console.log("Player cannot move outside the grid");
        }
    }

    startCombat() {
        const enemy = new goblin();
        this.inCombat = true;
        const combat = new Combat(this.player, enemy);
        let [x, y] = this.playerPosition;
        combat.onCombatEnd(() => {
            this.inCombat = false;
            this.map.setItemAtPosition(x, y, null);
        });
    }

    clearPlayerPosition() {
        /*
        This dosent work atm / not in use
        to:do
        interaction with merchant and loot?
        */
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.classList.remove("player-position"));
    }
}