
let gameObject = JSON.parse(window.localStorage.getItem("currentGame"));
let gameHeaderMarkup = `Team XYZ vs. ${gameObject.opponent}`;
document.querySelector('#gameHeader').innerHTML = `<h2>${gameHeaderMarkup}</h2>`

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
    statBarTemplate.content.querySelector('#statRatio').style = `width: ${ratio}%;`;
    statBarTemplate.content.querySelector('#statLabel').innerHTML = `${stat1} - ${stat2}`;

    let clone = document.importNode(statBarTemplate.content, true);
    document.querySelector('#statBarList').appendChild(clone);

});


