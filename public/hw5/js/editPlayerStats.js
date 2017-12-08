document.querySelector('#goals').value = currentPlayer.goals;
document.querySelector('#assists').value = currentPlayer.assists;
document.querySelector('#fouls').value = currentPlayer.fouls;
document.querySelector('#yellow').value = currentPlayer.yellow;
document.querySelector('#red').value = currentPlayer.red;

document.querySelector('#saveStats').addEventListener('click', function () {

    let goals = document.querySelector('#goals').value;
    let assists = document.querySelector('#assists').value;
    let fouls = document.querySelector('#fouls').value;
    let yellow = document.querySelector('#yellow').value;
    let red = document.querySelector('#red').value;
 
    currentPlayer.updateStats(goals, assists, fouls, yellow, red);
    currentTeam.saveToDatabase();

    document.querySelector('#toRoster').click();

});

