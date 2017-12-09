
let currentPlayer = JSON.parse(window.localStorage.getItem("currentPlayer"));

document.querySelector('#playerName').innerHTML = `${currentPlayer.playerFName} ${currentPlayer.playerLName}`;
document.querySelector('#position').innerHTML = currentPlayer.position;
document.querySelector('#playerNumber').innerHTML = currentPlayer.playerNumber;
document.querySelector('#dob').innerHTML = currentPlayer.playerBDay;
document.querySelector('#goals').innerHTML = currentPlayer.playerStats.goals;
document.querySelector('#assists').innerHTML = currentPlayer.playerStats.assists;


let user =  JSON.parse(window.localStorage.getItem("currentUser"));
if(user.userWho === "Coach") {
    document.querySelector('#edit1').visible = true;
    document.querySelector('#edit2').visible = true;
} 
