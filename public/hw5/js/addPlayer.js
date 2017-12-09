function errorInForm() {
    if(!document.querySelector('#fName').value) return true;
	if(!document.querySelector('#lName').value) return true;
	if(!document.querySelector('#email').value) return true;
	if(!document.querySelector('#dob').value) return true;
	if(!document.querySelector('#jersey').value) return true;
}

function printErrorMessage() {
        console.log("fix your input");
            document.querySelector('#errorSpace').innerHTML =
                `<blockquote>You must fill in all of the fields</blockquote>`;
}

document.querySelector('#addPlayer').addEventListener('click', function() {
        if(errorInForm()) printErrorMessage();
        else {

                let fName = document.querySelector('#fName').value;
                let lName = document.querySelector('#lName').value;
                let email = document.querySelector('#email').value;
                let dob = document.querySelector('#dob').value;
                let jersey = document.querySelector('#jersey').value;
                let select = document.querySelector('#position');
                let position = select.options[select.selectedIndex].value;
                let check = document.querySelector('#captain');
                let captain = check.value;

                let playerObject = currentTeam.roster.createPlayerObject(fName, lName, email, dob, jersey, position, captain, null);
                currentTeam.roster.addPlayer(playerObject);
                currentTeam.saveToFirebase().then(()=>{document.querySelector('#toPlayerRoster').click()});
        }
});

