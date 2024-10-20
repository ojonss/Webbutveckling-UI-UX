class Actor {
    constructor(actorName) {
        this.name = actorName;
        this.level = 1;
        this.maxHealth = 1;
        this.health = 1;
        this.armor = 1;
        this.gold = 0;
        this.hitChance = 0;
        this.damage = 0;
        this.damageRNG = 0;


    }

    getThrowDice(type) {
        let randomDice = (Math.floor(Math.random() * 20) + type) - 10;
        return randomDice;
    }

    addGold(amount) {
        this.gold += amount;
    }

    getGold() {
        return this.gold;
    }

    hitAttack(targetArmor) {
        let hit = this.getThrowDice(this.hitChance);
        if (parseInt(hit, 10) > parseInt(targetArmor, 10)) {
            return true;
        }
        return false;
    }

    getDamage() {
        var damage = this.damage + Math.floor(Math.random() * this.damageRNG) + 1;
        console.log("actor.js: " + this.name + " did " + damage + " amount of damage");
        return damage;
    }

    getArmor() {
        return this.armor;
    }

    takingDamage(amount) {
        this.health -= amount;
        return this.health;

    }

    healingDamage(amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
        return this.health;
    }

    death() {
        const showPlayerInfo = document.querySelector('.grid-container-info');
        showPlayerInfo.classList.add('hidden');
        const hideMainMenu = document.querySelector('.generateMenu');
        hideMainMenu.classList.remove('hidden');
        document.getElementById("grid-container").classList.add("hidden");
    }
}

class Player extends Actor {
    constructor(name = document.getElementById("playerName").value) {
        super(name); // Use the name provided or default to "Maximus"
        this.slayCounter = 0;
        this.level = 1;
        this.maxHealth = parseInt(document.getElementById("playerHealth").value, 10);
        this.health = parseInt(this.maxHealth, 10);
        this.armor = parseInt(document.getElementById("playerArmor").value, 10);
        this.gold = parseInt(document.getElementById("playerGold").value, 10);
        this.hitChance = parseInt(document.getElementById("playerHit").value, 10);
        this.damage = parseInt(document.getElementById("playerDamage").value, 10);
        this.damageRNG = parseInt(document.getElementById("playerDamageRNG").value, 10);
    }
}

class goblin extends Actor {
    constructor() {
        super("tinyGoblin");
        this.level = 1;
        this.maxHealth = 12;
        this.health = 12;
        this.armor = 8;
        this.gold = 20 + Math.floor(Math.random() * 30);
        this.hitChance = 8;
        this.damage = 2;
        this.damageRNG = Math.floor(Math.random() * 3);
    }
}