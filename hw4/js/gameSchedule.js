let gameList = document.querySelector('#gameList');

let gameTemplate = document.querySelector('#gameTemplate');
if(currentTeam.schedule.gamesArray.length === 0) {
    console.log('empty');
    gameList.innerHTML = `<div class="top-space"><strong>There are no games on the Schedule. If you are a coach, you can add a game using the add button.</strong></div>`
}

currentTeam.schedule.gamesArray.forEach(function(gameObject) {
    if(!gameObject.removed) {
        let date = new Date(gameObject.date);
        gameTemplate.content.querySelector('#gameHeader').innerHTML = `Team XYZ vs. ${gameObject.opponent}`;
        gameTemplate.content.querySelector('#date').innerHTML = date.toLocaleString();
        gameTemplate.content.querySelector('#location').innerHTML = gameObject.location;
        gameTemplate.content.querySelector('#homeOrAway').innerHTML = `${gameObject.homeOrAway} Game`;

        if (gameObject.gameStats) {
            gameTemplate.content.querySelector('#result').innerHTML = gameObject.result;
        }

        if (currentUser.userWho === "Coach") {
            gameTemplate.content.querySelector('#buttonZone').innerHTML =
                `<button onclick=setCurrentGame("${gameObject.id}") class="btn">Edit</button>`;
        }

        let clone = document.importNode(gameTemplate.content, true);
        gameList.appendChild(clone);
    }
});

if(currentUser.userWho === "Coach") {
    document.querySelector('#addBtn').innerHTML = `<a href="addGame.html"><button class="btn">Add</button></a>`;
}

function setCurrentGame(id) {
    let index = currentTeam.schedule.findGameIndex(id);
    let gameObject = currentTeam.schedule.gamesArray[index];
    window.localStorage.setItem("currentGame", JSON.stringify(gameObject));
    document.querySelector('#toEditGame').click();
    console.log('set the current game');
}