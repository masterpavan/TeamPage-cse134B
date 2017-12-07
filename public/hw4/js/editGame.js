
let gameObject = JSON.parse(window.localStorage.getItem("currentGame"));
let gameHeaderMarkup = `Team XYZ vs. ${gameObject.opponent}`;
document.querySelector('#gameHeader').innerHTML = `<h3>${gameHeaderMarkup}</h3>`

if(document.title === "Edit a Game") {
    document.querySelector('#opponent').value = gameObject.opponent;
    document.querySelector('#location').value = gameObject.location;
    document.querySelector('#datetime').value = new Date(gameObject.date).toISOString().slice(0,-5);

    function errorInForm() {
        if(!document.querySelector('#opponent').value) return true;
        if(!document.querySelector('#location').value) return true;
        if(!document.querySelector('#datetime').value) return true;
    }

    function printErrorMessage() {
        console.log("fix your input");
    }

    document.querySelector('#saveChange').addEventListener('click', function () {
        if(errorInForm()) printErrorMessage();
        else {

            document.querySelector('#toGameSchedule').click();
            let opponent = document.querySelector('#opponent').value;
            let location = document.querySelector('#location').value;
            let date = new Date(document.querySelector('#datetime').value);
            date = date.getTime();
            let homeOrAway = document.querySelector("input[name=homeOrAway]:checked").value;

            let gameObject = JSON.parse(window.localStorage.getItem("currentGame"));
            gameObject.opponent = opponent;
            gameObject.location = location;
            gameObject.date = date;
            gameObject.homeOrAway = homeOrAway;

            window.localStorage.setItem("currentGame", JSON.stringify(gameObject));
            currentTeam.schedule.updateGame(gameObject.id, gameObject);
            currentTeam.saveToFirebase();
        }
    });

    document.querySelector('#deleteMatch').addEventListener('click', function () {
        document.querySelector('#toGameSchedule').click();
        let gameObject = JSON.parse(window.localStorage.getItem("currentGame"));
        currentTeam.schedule.removeGame(gameObject.id);
        currentTeam.saveToFirebase();
        gameObject.removed = true;
        window.localStorage.setItem("currentGame", JSON.stringify(gameObject));

    });
}


if(document.title === "Edit Game Stats") {

    if(!gameObject.gameStats) {
        gameObject.gameStats = {
            "Score": [0, 0],
            "Fouls": [0, 0],
            "Red Cards": [0, 0],
            "Yellow Cards": [0, 0],
            "Shots on Goal": [0, 0],
            "Corner Kicks": [0, 0],
            "Goal Kicks": [0, 0]
        };
    }


    let t = document.querySelector('#statBar');
    Object.keys(gameObject.gameStats).forEach(function(gameObjectKey) {
        let statBarTemplate = t;
        let stat1 = gameObject.gameStats[gameObjectKey][0];
        let stat2 = gameObject.gameStats[gameObjectKey][1];
        let ratio = 50;
        if((stat1+stat2) !== 0) ratio = stat1/(stat1+stat2) * 100;

        statBarTemplate.content.querySelector('#statTitle').innerHTML = gameObjectKey;
        statBarTemplate.content.querySelector('#statRatio').style = `width: ${ratio}%`;
        statBarTemplate.content.querySelector('#statRatio').className += " " + `${gameObjectKey}Ratio`.replace(/\s+/g, '');
        statBarTemplate.content.querySelector('#statLabel').innerHTML = `${stat1} - ${stat2}`;
        statBarTemplate.content.querySelector('#statLabel').className = `${gameObjectKey}Label`.replace(/\s+/g, '');

        statBarTemplate.content.querySelector('#stat1minus').className += " " + `${gameObjectKey}1minus`.replace(/\s+/g, '');
        statBarTemplate.content.querySelector('#stat1plus').className += " " + `${gameObjectKey}1plus`.replace(/\s+/g, '');
        statBarTemplate.content.querySelector('#stat2minus').className += " " + `${gameObjectKey}2minus`.replace(/\s+/g, '');
        statBarTemplate.content.querySelector('#stat2plus').className += " " + `${gameObjectKey}2plus`.replace(/\s+/g, '');

        let clone = document.importNode(statBarTemplate.content, true);
        document.querySelector('#statBarList').appendChild(clone);
        addClickEvent(gameObjectKey, 1, "plus");
        addClickEvent(gameObjectKey, 1, "minus");
        addClickEvent(gameObjectKey, 2, "plus");
        addClickEvent(gameObjectKey, 2, "minus");
    });

    function addClickEvent(statKey, statNumber, type) {

        document.querySelector(`.${statKey}${statNumber}${type}`.replace(/\s+/g, '')).addEventListener('click', function() {

            if(type === "plus") gameObject.gameStats[statKey][statNumber-1]++;
            if(type === "minus") {
                if(gameObject.gameStats[statKey][statNumber-1] > 0) {
                    gameObject.gameStats[statKey][statNumber-1]--;
                }
            }

            let stat1 = gameObject.gameStats[statKey][0];
            let stat2 = gameObject.gameStats[statKey][1];
            let ratio = 50;
            if((stat1+stat2) !== 0) ratio = stat1/(stat1+stat2) * 100;

            document.querySelector(`.${statKey}Label`.replace(/\s+/g, '')).innerHTML = `${stat1} - ${stat2}`;
            document.querySelector(`.${statKey}Ratio`.replace(/\s+/g, '')).style = `width: ${ratio}%`;

        });

    };

    document.querySelector('#saveBtn').addEventListener('click', function () {
        let team1Score = gameObject.gameStats.Score[0];
        let team2Score = gameObject.gameStats.Score[1];

        if(team1Score > team2Score) gameObject.result = "Victory";
        else if(team2Score > team1Score) gameObject.result = "Defeat";
        else gameObject.result = "Tie";

        gameObject.result += `<br>${team1Score} - ${team2Score}`;

        document.querySelector('#toViewGameStats').click();
        currentTeam.schedule.updateGame(gameObject.id, gameObject);
        currentTeam.saveToFirebase();
        window.localStorage.setItem("currentGame", JSON.stringify(gameObject));

    });

}
