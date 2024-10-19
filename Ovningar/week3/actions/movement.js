class Movement {
    constructor(map, playerGridSize = 7) {
        this.map = map; // The full map grid
        this.playerGridSize = playerGridSize;
        this.playerPosition = [
            Math.floor(map.fullWidth / 2),
            Math.floor(map.fullHeight / 2)
        ]; // Start player at the center of the full map

        this.inCombat = false;
        this.updateViewport();

        this.player = new Player();
        document.addEventListener("keydown", (event) => this.handleMovement(event));
    }

    updateViewport() {
        const [playerX, playerY] = this.playerPosition;

        // Get the 7x7 view around the player
        const viewport = this.map.getViewport(playerX, playerY, this.playerGridSize);

        // Clear previous grid and re-render based on the new view
        const gridContainer = document.getElementById("grid-container");
        gridContainer.innerHTML = "";
        gridContainer.style.gridTemplateColumns = `repeat(${this.playerGridSize}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${this.playerGridSize}, 1fr)`;

        // Generate the 7x7 player grid view based on the viewport
        for (let y = 0; y < this.playerGridSize; y++) {
            for (let x = 0; x < this.playerGridSize; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");

                if (x === Math.floor(this.playerGridSize / 2) && y === Math.floor(this.playerGridSize / 2)) {
                    cell.classList.add("player-position"); // Center of the 7x7 grid
                }

                const item = viewport[y][x];
                if (item) {
                    cell.classList.add(item + "-position");
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
            this.updateViewport(); // Refresh the view around the new player position
        } else if (encounteredItem === "wall") {
            console.log("Can't move there, wall.");
        } else if (encounteredItem === "merchant") {
            this.playerPosition = [x, y];
            this.updateViewport(); // Refresh the view around the new player position
        } else if (encounteredItem === "loot") {
            this.playerPosition = [x, y];
            this.updateViewport(); // Refresh the view around the new player position
        } else if (encounteredItem === "enemy") {
            this.playerPosition = [x, y];
            this.updateViewport(); // Refresh the view around the new player position
            this.startCombat();
        } else {
            console.log("Player cannot move outside the grid");
        }
    }
}


/*class Movement {
    constructor(map) {
        this.sight_x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.sight_y = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.playerStartPos = [5, 5];
        this.map = map;

        this.inCombat = false;

        this.updatePlayerPosition();

        this.player = new Player();
        document.addEventListener("keydown", (event) => this.handleMovement(event));
    }

    setPlayerPosition(x, y) {
        if (this.isValidPosition(x, y)) {
            this.clearPlayerPosition();
            this.playerStartPos = [x, y];
            this.updatePlayerPosition();
            this.checkItemInteraction(x, y);
        } else {
            console.log("Invalid position");
        }
    }

    isValidPosition(x, y) {
        return this.sight_x.includes(x) && this.sight_y.includes(y);
    }

    handleMovement(event) {
        if (this.inCombat) {
            return;
        }
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;
        const LEFT = 37;
        const INTERACT = 32;

        let [x, y] = this.playerStartPos;
        let direction = null;

        switch (event.which) {
            case UP:
                y -= 1;
                direction = "up";
                break;
            case DOWN:
                y += 1;
                direction = "down";
                break;
            case LEFT:
                x -= 1;
                direction = "left";
                break;
            case RIGHT:
                x += 1;
                direction = "right";
                break;
            case INTERACT:
                console.log("SPACEBAR - INTERACT");
                return;
            default:
                return;
        }

        if (direction && this.isValidPosition(x, y)) {
            const encounteredItem = this.map.getItemAtPosition(x, y);

            if (encounteredItem === null) {
                this.setPlayerPosition(x, y);
            } else if (encounteredItem === "wall") {
                console.log("Can't move there, wall.");
            } else if (encounteredItem === "merchant") {
                this.setPlayerPosition(x, y);
            } else if (encounteredItem === "loot") {
                this.setPlayerPosition(x, y);
            } else if (encounteredItem === "enemy") {
                this.setPlayerPosition(x, y);
                this.startCombat();
            } else {
                console.log("Player cannot move outside the grid");
            }
        }
    }

    startCombat() {
        const [x, y] = this.playerStartPos;
        const enemy = new goblin();
        this.inCombat = true;
        const combat = new Combat(this.player, enemy);

        combat.onCombatEnd(() => {
            this.inCombat = false;
            console.log("Combat has ended. You can move again.");
            mapPlacement.setItemAtPosition(x, y, null);
            this.updatePlayerPosition();
        });
    }

    updatePlayerPosition() {
        const [x, y] = this.playerStartPos;
        const index = y * 7 + x;
        const cells = document.querySelectorAll(".cell");

        if (cells[index]) {
            cells[index].classList.add("player-position");
        }
    }

    clearPlayerPosition() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.classList.remove("player-position"));
    }

    checkItemInteraction(x, y) {
        const item = this.map.getItemAtPosition(x, y);
        if (item) {
            console.log("Player encountered a " + item + "!");
        }
    }
}

new Movement(mapPlacement);*/
