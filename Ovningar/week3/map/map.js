class MapPlacement {
    constructor(fullWidth = 20, fullHeight = 20) { // Assume the larger map dimensions
        this.fullWidth = fullWidth;
        this.fullHeight = fullHeight;
        this.itemIndexMap = Array.from({ length: this.fullHeight }, () => Array(this.fullWidth).fill(null));

        // Adjust item counts dynamically based on full map size
        this.numberOfEnemies = Math.floor((this.fullHeight * this.fullWidth) * 0.075);
        this.numberOfMerchants = Math.floor((this.fullHeight * this.fullWidth) * 0.021);
        this.numberOfLoots = Math.floor((this.fullHeight * this.fullWidth) * 0.021);
        this.numberOfWalls = Math.floor((this.fullHeight * this.fullWidth) * 0.3);

        this.placeItems("enemy", this.numberOfEnemies);
        this.placeItems("merchant", this.numberOfMerchants);
        this.placeItems("loot", this.numberOfLoots);
        this.placeItems("wall", this.numberOfWalls);
    }

    checkItemPosition(x, y) {
        return this.itemIndexMap[y] && this.itemIndexMap[y][x] === null;
    }

    placeItems(type, count) {
        let placed = 0;

        while (placed < count) {
            let x = Math.floor(Math.random() * this.fullWidth);
            let y = Math.floor(Math.random() * this.fullHeight);

            if (this.checkItemPosition(x, y)) {
                this.itemIndexMap[y][x] = type;
                placed++;
            }
        }
    }

    getItemAtPosition(x, y) {
        return this.itemIndexMap[y] && this.itemIndexMap[y][x];
    }

    setItemAtPosition(x, y, type) {
        if (x >= 0 && x < this.fullWidth && y >= 0 && y < this.fullHeight) {
            this.itemIndexMap[y][x] = type;
        }
    }

    // New method: Get the 7x7 viewport centered around the player's position
    getViewport(centerX, centerY, size = 7) {
        const halfSize = Math.floor(size / 2);
        const viewport = [];

        for (let y = -halfSize; y <= halfSize; y++) {
            const row = [];
            for (let x = -halfSize; x <= halfSize; x++) {
                const mapX = centerX + x;
                const mapY = centerY + y;
                row.push(this.getItemAtPosition(mapX, mapY));
            }
            viewport.push(row);
        }
        return viewport;
    }
}


/*class MapPlacement {
    constructor(gridWidth = 7, gridHeight = 7) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.itemIndexMap = Array.from({ length: this.gridWidth }, () => Array(this.gridHeight).fill(null));

        // Adjust item counts dynamically based on grid size
        this.numberOfEnemies = Math.floor((this.gridHeight * this.gridWidth) * 0.075);
        this.numberOfMerchants = Math.floor((this.gridHeight * this.gridWidth) * 0.021);
        this.numberOfLoots = Math.floor((this.gridHeight * this.gridWidth) * 0.021);
        this.numberOfWalls = Math.floor((this.gridHeight * this.gridWidth) * 0.3);

        this.placeItems("enemy", this.numberOfEnemies);
        this.placeItems("merchant", this.numberOfMerchants);
        this.placeItems("loot", this.numberOfLoots);
        this.placeItems("wall", this.numberOfWalls);

        this.applyItemStyles();
    }
    /*constructor() {
        this.gridWidth = 7;
        this.gridHeight = 7;
        this.itemIndexMap = Array.from({ length: this.gridWidth }, () => Array(this.gridHeight).fill(null));

        this.numberOfEnemies = Math.floor((this.gridHeight * this.gridWidth) * 0.075);
        this.numberOfMerchants = Math.floor((this.gridHeight * this.gridWidth) * 0.021);
        this.numberOfLoots = Math.floor((this.gridHeight * this.gridWidth) * 0.021);
        this.numberOfWalls = Math.floor((this.gridHeight * this.gridWidth) * 0.3);

        this.placeItems("enemy", this.numberOfEnemies);
        this.placeItems("merchant", this.numberOfMerchants);
        this.placeItems("loot", this.numberOfLoots);
        this.placeItems("wall", this.numberOfWalls);

        this.applyItemStyles();
    }----------------------------------

    checkItemPosition(x, y) {
        return this.itemIndexMap[x][y] === null;
    }

    placeItems(type, count) {
        let placed = 0;

        while (placed < count) {
            let x = Math.floor(Math.random() * this.gridWidth);
            let y = Math.floor(Math.random() * this.gridHeight);

            if (this.checkItemPosition(x, y)) {
                this.itemIndexMap[x][y] = type;
                placed++;
            }
        }
    }

    applyItemStyles() {
        const cells = document.querySelectorAll(".cell");
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const index = y * this.gridWidth + x;
                const itemType = this.itemIndexMap[x][y];
                if (itemType) {
                    cells[index].classList.add(itemType + "-position");
                }
            }
        }
    }

    getItemAtPosition(x, y) {
        return this.itemIndexMap[x][y];
    }

    setItemAtPosition(x, y, type) {
        if (x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight) {
            this.itemIndexMap[x][y] = type;
            this.updateCellStyle(x, y, type);
        }
    }

    updateCellStyle(x, y, type) {
        const index = y * this.gridWidth + x;
        const cells = document.querySelectorAll(".cell");

        if (cells[index]) {
            cells[index].className = "cell";
            if (type) {
                cells[index].classList.add(type + "-position");
            }
        }
    }
}

const mapPlacement = new MapPlacement();
*/