class Combat {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;

        this.currentTurn = "player";
        this.combatInProgress = true;
        this.onEndCallback = null;

        this.clearCombatMessages();
        this.logToCombatHeader(this.player.name + " encounters " + this.enemy.name + "! Combat starts!");
        this.logToCombatDisplay("Press \"spacebar\" to progress");

        this.handleTurn = this.handleTurn.bind(this);
        document.addEventListener("keydown", this.handleTurn);

        this.showElements();
        this.displayStatus();
    }

    displayStatus() {
        this.logToCombatDisplay(this.player.name + " Health: " + this.player.health);
        this.logToCombatDisplay(this.enemy.name + " Health: " + this.enemy.health);
    }

    handleTurn(event) {
        const SPACEBAR = 32;
        if (event.which != SPACEBAR || !this.combatInProgress) {
            return;
        }

        this.clearCombatParagraphs();

        if (this.currentTurn === "player") {
            this.playerTurn();
        }
        else if (this.currentTurn === "enemy") {
            this.enemyTurn();
        }
        else if (this.currentTurn === "CombatOver") {
            this.endCombat();
        }
        this.displayStatus();

        if ((this.player.health <= 0 || this.enemy.health <= 0) && this.currentTurn != "CombatOver") {
            this.currentTurn = "CombatOver";
            this.endCombatMessage();

        }
    }

    // TO:DO maybe two diffrent attacks, one better hit but lower damage? Use two seperate keys
    playerTurn() {
        const hit = this.player.hitAttack(this.enemy.getArmor());
        if (hit) {
            var damage = this.player.getDamage();
            this.logToCombatDisplay(this.player.name + " hits " + this.enemy.name + " for " + damage + " damage!");
            this.enemy.takingDamage(damage);
        } else {
            this.logToCombatDisplay(this.player.name + " missed!");
        }

        this.currentTurn = "enemy";
    }

    enemyTurn() {
        const hit = this.enemy.hitAttack(this.player.getArmor());
        if (hit) {
            var damage = this.enemy.getDamage();
            this.logToCombatDisplay(this.enemy.name + " hits " + this.player.name + " for " + damage + " damage!");
            this.player.takingDamage(damage);
        } else {
            this.logToCombatDisplay(this.enemy.name + " missed!");
        }

        this.currentTurn = "player";
    }

    endCombatMessage() {
        if (this.player.health <= 0) {
            this.clearCombatMessages();
            this.logToCombatHeader(this.player.name + " has been defeated...");
            this.logToCombatDisplay(this.player.name + " slayed: " + this.player.slayCounter + " number of enemies!");
            this.logToCombatDisplay(this.player.name + " had: " + this.player.getGold() + " gold when they died!");
            this.logToCombatDisplay(this.player.name + " was level " + this.player.level + " when they fell!");
            this.logToCombatDisplay("TO-DO:");
            this.logToCombatDisplay("Can actually level up");
            this.logToCombatDisplay("Step counter?");
            this.player.death();
        } else if (this.enemy.health <= 0) {
            var goldLoot = this.enemy.getGold();
            this.logToCombatDisplay(this.enemy.name + " is defeated!");
            this.logToCombatDisplay("You found " + goldLoot + " gold on the enemy.");
            this.player.addGold(goldLoot);
            this.logToCombatDisplay("You now have " + this.player.getGold() + " amount of gold.");
            this.player.slayCounter++;
        }
        this.logToCombatDisplay("Press \"Spacebar\" to continue.");
    }

    endCombat() {
        this.combatInProgress = false;
        document.removeEventListener("keydown", this.handleTurn);

        this.hideElements();
        this.clearCombatMessages();

        playerInfoBox(this.player);

        if (typeof this.onEndCallback === "function") {
            this.onEndCallback();
        }
    }

    onCombatEnd(callback) {
        this.onEndCallback = callback;
    }

    showElements() {
        const apa = document.querySelector('.combatDisplay');
        apa.classList.remove('hidden');
    }

    hideElements() {
        const apa = document.querySelector('.combatDisplay');
        apa.classList.add('hidden');
    }


    //replace with function in msgBoxFunction.js also create a .js for usefull functions
    logToCombatHeader(message) {
        const combatText = document.getElementById("combat-text");

        const newHeader = document.createElement("h1");
        newHeader.textContent = message;
        combatText.appendChild(newHeader);
    }

    //replace with function in msgBoxFunction.js also create a .js for usefull functions
    logToCombatDisplay(message) {
        const combatText = document.getElementById("combat-text");
        const newMessage = document.createElement("p");
        newMessage.textContent = message;
        combatText.appendChild(newMessage);
    }

    //replace with function in msgBoxFunction.js also create a .js for usefull functions
    clearCombatMessages() {
        const combatText = document.getElementById("combat-text");
        combatText.innerHTML = "";
    }

    // Remove <p> text so during combat, there is only one message active
    clearCombatParagraphs() {
        const combatText = document.getElementById("combat-text");
        const paragraphs = combatText.querySelectorAll("p");
        paragraphs.forEach(p => p.remove());
    }
}
