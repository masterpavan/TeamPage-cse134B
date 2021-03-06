
function errorInForm() {
    if(!document.querySelector('#opponent').value) return true;
    if(!document.querySelector('#location').value) return true;
    if(!document.querySelector('#datetime').value) return true;
}

function printErrorMessage() {
    console.log("fix your input");
    document.querySelector('#errorSpace').innerHTML =
        `<blockquote>You must fill in all of the fields</blockquote>`;
}

document.querySelector('#addMatch').addEventListener('click', function () {
    if(errorInForm()) printErrorMessage();
    else {

        let opponent = document.querySelector('#opponent').value;
        let location = document.querySelector('#location').value;
        let date = new Date(document.querySelector('#datetime').value);
        date = date.getTime();
        let homeOrAway = document.querySelector("input[name=homeOrAway]:checked").value;

        let gameObject = currentTeam.schedule.createGameObject(opponent, date, location, homeOrAway, null);
        currentTeam.schedule.addGame(gameObject);
        currentTeam.saveToFirebase().then(()=>{document.querySelector('#toGameSchedule').click()});

    }
});

