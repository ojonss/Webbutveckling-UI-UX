class MapPlacement {
    constructor() {
        this.gridWidth = 7;
        this.gridHeight = 7;
        this.itemIndexMap = Array.from({ length: this.gridWidth }, () => Array(this.gridHeight).fill(null));

        this.numberOfEnemies = 3;
        this.numberOfMerchants = 1;
        this.numberOfLoots = 1;
        this.numberOfWalls = 10;

        this.placeItems("enemy", this.numberOfEnemies);
        this.placeItems("merchant", this.numberOfMerchants);
        this.placeItems("loot", this.numberOfLoots);
        this.placeItems("wall", this.numberOfWalls);

        this.applyItemStyles();
    }

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
