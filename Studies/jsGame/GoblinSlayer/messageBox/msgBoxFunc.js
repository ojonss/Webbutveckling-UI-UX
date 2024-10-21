/*Write message in box below playfield*/ 
function playerInfoBox(player){
    clearText('player-info');

    writePText("PLAYER: " + player.name, 'player-info');
    writePText("HEALTH: " + player.health + "/" + player.maxHealth, 'player-info');
    writePText("ARMOR: " + player.armor, 'player-info')
}

/*Usefull functions*/
function clearText(whereToPlaceText){
    const text = document.getElementById(whereToPlaceText);
    text.innerHTML = "";
}

function writePText(message, whereToPlaceText){
    const text = document.getElementById(whereToPlaceText);
    const newText = document.createElement("p");
    newText.textContent = message;
    text.appendChild(newText);
}