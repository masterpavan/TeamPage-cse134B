document.querySelector('#wins').value = currentTeam.teamStats.wins;
document.querySelector('#losses').value = currentTeam.teamStats.losses;
document.querySelector('#ties').value = currentTeam.teamStats.ties;
document.querySelector('#goalsFor').value = currentTeam.teamStats.goalsFor;
document.querySelector('#goalsAgainst').value = currentTeam.teamStats.goalsAgainst;

document.querySelector('#saveStats').addEventListener('click', function () {

    let wins = document.querySelector('#wins').value;
    let losses = document.querySelector('#losses').value;
    let ties = document.querySelector('#ties').value;
    let goalsFor = document.querySelector('#goalsFor').value;
    let goalsAgainst = document.querySelector('#goalsAgainst').value;

    currentTeam.updateStats(wins, losses, ties, goalsFor, goalsAgainst);
    currentTeam.saveToDatabase();

    document.querySelector('#toHomepage').click();

});
