let currentPlyr = JSON.parse(window.localStorage.getItem('currentPlayer'));

document.querySelector('#goals').value = currentPlyr.playerStats.goals;
document.querySelector('#assists').value = currentPlyr.playerStats.assists;
document.querySelector('#fouls').value = currentPlyr.playerStats.fouls;
document.querySelector('#yellow').value = currentPlyr.playerStats.yellow;
document.querySelector('#red').value = currentPlyr.playerStats.red;

document.querySelector('#saveStats').addEventListener('click', function () {

    let newGoals = document.querySelector('#goals').value;
    let newAssists = document.querySelector('#assists').value;
    let newFouls = document.querySelector('#fouls').value;
    let newYellow = document.querySelector('#yellow').value;
    let newRed = document.querySelector('#red').value;

    let playerObject = currentTeam.roster.createPlayerObject(
        currentPlyr.playerFName,
        currentPlyr.playerLName,
        currentPlyr.playerEmail,
        currentPlyr.playerBDay,
        currentPlyr.playerNumber,
        currentPlyr.position,
        currentPlyr.captain,
        {
            goals: newGoals,
            assists: newAssists,
            fouls: newFouls,
            yellow: newYellow,
            red: newRed
        });

    console.log("Player object is:",playerObject);
    currentTeam.roster.updatePlayer(currentPlyr.id, playerObject);

    currentTeam.saveToFirebase().then(()=>{document.querySelector('#toRoster').click()});



});

