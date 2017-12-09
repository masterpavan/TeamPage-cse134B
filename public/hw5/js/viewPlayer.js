
let currentPlayer = JSON.parse(window.localStorage.getItem("currentPlayer"));
document.querySelector('#playerName').innerHTML = `${currentPlayer.playerFName} ${currentPlayer.playerLName}`;
document.querySelector('#position').innerHTML = currentPlayer.position;
document.querySelector('#playerNumber').innerHTML = currentPlayer.playerNumber;
document.querySelector('#dob').innerHTML = currentPlayer.playerBDay;
document.querySelector('#goals').innerHTML = currentPlayer.goals;
document.querySelector('#assists').innerHTML = currentPlayer.assists;
document.querySelector('#gamesPlayed').innerHTML = currentPlayer.gamesPlayed;


let user =  JSON.parse(window.localStorage.getItem("currentUser"));
if(user.userWho === "Coach") {
    console.log(user.userWho);
    document.querySelector('#edit1').style.display = "";
    document.querySelector('#edit2').style.display = "";
} 
