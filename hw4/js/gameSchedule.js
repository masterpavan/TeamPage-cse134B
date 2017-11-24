let gameList = document.querySelector('#gameList');

let gameTemplate = document.querySelector('#gameTemplate');

currentTeam.schedule.gamesArray.forEach(function(gameObject) {
    if(!gameObject.removed) {
        let date = new Date(gameObject.date);
        gameTemplate.content.querySelector('#gameHeader').innerHTML = `Team XYZ vs. ${gameObject.opponent}`;
        gameTemplate.content.querySelector('#date').innerHTML = `${date.toDateString()} at <br> ${date.toTimeString()}`;
        gameTemplate.content.querySelector('#location').innerHTML = gameObject.location;
        gameTemplate.content.querySelector('#homeOrAway').innerHTML = `${gameObject.homeOrAway} Game`;

        if (gameObject.gameStats) {
            gameTemplate.content.querySelector('#result').innerHTML = gameObject.gameStats.result;
        }

        if (currentUser.userWho === "Coach") {
            gameTemplate.content.querySelector('#buttonZone').innerHTML =
                `<a href="editGameStats.html"><button class="btn">Edit</button></a>`;
        }

        let clone = document.importNode(gameTemplate.content, true);
        gameList.appendChild(clone);
    }
});

if(currentUser.userWho === "Coach") {
    document.querySelector('#addBtn').innerHTML = `<a href="addGame.html"><button class="btn">Add</button></a>`;
}