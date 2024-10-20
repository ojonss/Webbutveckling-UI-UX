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
        // Create a new player instance
        const player = new Player(document.getElementById("playerName").value);
        player.maxHealth = parseInt(document.getElementById("playerHealth").value, 10);
        player.health = player.maxHealth;
        playerInfoBox(player);


        const showPlayerInfo = document.querySelector('.grid-container-info');
        showPlayerInfo.classList.remove('hidden');
        const hideMainMenu = document.querySelector('.generateMenu');
        hideMainMenu.classList.add('hidden');
        document.getElementById("grid-container").classList.remove("hidden");

        
        // Game starts here
        new Movement(fullMap);
    }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    // If the clicked element is not the button and not inside the dropdown content
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};