class Movement {
    constructor(map) {
        this.sight_x = [0, 1, 2, 3, 4, 5, 6];
        this.sight_y = [0, 1, 2, 3, 4, 5, 6];
        this.playerStartPos = [3, 3];
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

new Movement(mapPlacement);
