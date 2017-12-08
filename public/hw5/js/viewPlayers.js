let rosterList = document.querySelector('#rosterList');

let rosterTemplate = document.querySelector('#rosterTemplate');


let numPlayers = 0;
currentTeam.roster.playersArray.forEach(function(playerObject) {
	if(!playerObject.removed) {
		numPlayers++;
		console.log(playerObject);
        rosterTemplate.content.querySelector('#name').className += ` ${playerObject.id}`;
        rosterTemplate.content.querySelector('#name').innerHTML = playerObject.playerFName + " " + playerObject.playerLName;
		rosterTemplate.content.querySelector('#number').innerHTML = playerObject.playerNumber;
		rosterTemplate.content.querySelector('#goals').innerHTML  = playerObject.goals;
		rosterTemplate.content.querySelector('#assists').innerHTML = playerObject.assists;
		rosterTemplate.content.querySelector('#fouls').innerHTML = playerObject.fouls;
		rosterTemplate.content.querySelector('#yellow').innerHTML = playerObject.yellow;
		rosterTemplate.content.querySelector('#red').innerHTML = playerObject.red;

		let clone = document.importNode(rosterTemplate.content, true);
		rosterList.appendChild(clone);

		addClickEvent(playerObject.id);

    }

});

if (numPlayers === 0) {
    console.log('empty');
    document.querySelector('#playerList').innerHTML = `<div class="top-space" align="center"><strong>There are no players on the Roster. If you are a coach, you can add a player using the add button.</strong></div>`
}

if (currentUser.userWho === "Coach") {
	document.querySelector('#addBtn').innerHTML =`<a href="addPlayer.html"><button class="btn">Add</button></a>`;
}

if (currentUser.userWho === "Coach" && numPlayers > 0) {
	document.querySelector('#editBtn').visible = true;
}

function addClickEvent(id){
    document.querySelector(`.${id}`).addEventListener('click', function() {
        let index = currentTeam.roster.findPlayerIndex(id);
        let playerObject = currentTeam.roster.playersArray[index];
        window.localStorage.setItem("currentPlayer", JSON.stringify(playerObject));

	});

}
