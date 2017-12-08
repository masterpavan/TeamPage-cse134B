let currentPlyr = JSON.parse(window.localStorage.getItem('currentPlayer'));

document.querySelector('#fName').value = currentPlyr.playerFName;
document.querySelector('#lName').value = currentPlyr.playerLName;
document.querySelector('#email').value = currentPlyr.playerEmail;
document.querySelector('#date').value = currentPlyr.playerBDay;
document.querySelector('#number').value = currentPlyr.playerNumber;


function errorInForm() {
    if(!document.querySelector('#fName').value) return true;
    if(!document.querySelector('#lName').value) return true;
    if(!document.querySelector('#email').value) return true;
    if(!document.querySelector('#date').value) return true;
    if(!document.querySelector('#number').value) return true;
}

function printErrorMessage() {
    console.log("fix your input");
}

document.querySelector('#saveChanges').addEventListener('click', function() {
    if(errorInForm()) printErrorMessage();
    else {
        document.querySelector('#toPlayerRoster').click();
        let fName = document.querySelector('#fName').value;
        let lName = document.querySelector('#lName').value;
        let email = document.querySelector('#email').value;
        let dob = document.querySelector('#date').value;
        let jersey = document.querySelector('#number').value;
        let select = document.querySelector('#position');
        let position = select.options[select.selectedIndex].value;
        let check = document.querySelector('#captain');
        let captain = check.value;

        let playerObject = currentTeam.roster.createPlayerObject(fName, lName, email, dob, jersey, position, captain);
        console.log("Player object is:",playerObject);
        currentTeam.roster.updatePlayer(currentPlyr.id, playerObject);
        currentTeam.saveToFirebase();
    }
});

document.querySelector('#deletePlayer').addEventListener('click', function () {

    document.querySelector('#toPlayerRoster').click();
    currentTeam.roster.removePlayer(currentPlyr.id);
    currentTeam.saveToDatabase();

});
