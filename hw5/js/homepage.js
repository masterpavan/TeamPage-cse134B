
console.log("you is on the homepage");

document.querySelector('#wins').innerHTML = currentTeam.teamStats.wins;
document.querySelector('#losses').innerHTML = currentTeam.teamStats.losses;
document.querySelector('#ties').innerHTML = currentTeam.teamStats.ties;
document.querySelector('#goalsFor').innerHTML = currentTeam.teamStats.goalsFor;
document.querySelector('#goalsAgainst').innerHTML = currentTeam.teamStats.goalsAgainst;


let nextGame = currentTeam.schedule.getNextGame();
if(nextGame) {
    let date = new Date(nextGame.date);
    let featuredGameMarkup = `
        <strong>Next Game</strong><br>
        ${date.toLocaleString()}<br>
        at ${nextGame.location}<br>
        vs. ${nextGame.opponent}<br>`;

    document.querySelector('#nextGame').innerHTML = featuredGameMarkup;
}

if(currentUser.userWho === "Coach") {
    let editBtnMarkup = `<a href="editTeamStats.html"><button type="button" class="btn">Edit Team Stats</button></a>`;
    document.querySelector("#buttonZone").style.display = 'block';
    document.querySelector("#buttonZone").innerHTML = editBtnMarkup;
}