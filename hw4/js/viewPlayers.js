let rosterList = document.querySelector('#rosterList');

let rosterTemplate = document.querySelector('#rosterTemplate');
if (currentTeam.roster.playersArray.length === 0) {
	console.log('empty');
	rosterList.innerHTML = `<div class="top-space"><strong>There are no players on the Roster. If you are a coach, you can add a player using the add button.</strong></div>`
}

currentTeam.roster.playersArray.forEach(function(playerObject) {
	if(!playerObject.removed) {
		rosterTemplate.content.querySelector('#name').innerHTML = playerObject.playerFName + " " + playerObject.playerLName;
		rosterTemplate.content.querySelector('#number').innerHTML = playerObject.playerNumber;
		rosterTemplate.content.querySelector('#goals').innerHTML  = playerObject.goals;
		rosterTemplate.content.querySelector('#assists').innerHTML = playerObject.assists;
		rosterTemplate.content.querySelector('#fouls').innerHTML = playerObject.fouls;
		rosterTemplate.content.querySelector('#yellow').innerHTML = playerObject.yellow;
		rosterTemplate.content.querySelector('#red').innerHTML = playerObject.red;

		let clone = document.importNode(rosterTemplate.content, true);
		rosterList.appendChild(clone);
	}

});

if (currentUser.userWho === "Coach") {
	document.querySelector('#addBtn').innerHTML =`<a href="addPlayer.html"><button class="btn">Add</button></a>`;
}
