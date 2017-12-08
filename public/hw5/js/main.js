
class Team {

    constructor(teamObject) {
        this.teamName = teamObject.teamName;
        this.roster = new Roster(teamObject.roster);
        this.schedule = new Schedule(teamObject.schedule);
        this.teamStats = teamObject.teamStats;
    }

    updateStats(wins, losses, ties, goalsFor, goalsAgainst) {
        this.teamStats.wins = wins;
        this.teamStats.losses = losses;
        this.teamStats.ties = ties;
        this.teamStats.goalsFor = goalsFor;
        this.teamStats.goalsAgainst = goalsAgainst;
    }

    saveToDatabase() {
        let teamJSON = {
            teamName: this.teamName,
            roster: this.roster.playersArray,
            schedule: this.schedule.gamesArray,
            teamStats: this.teamStats
        };
        window.localStorage.setItem("currentTeam", JSON.stringify(teamJSON));
        console.log("saved to localstorage");
    }

    async saveToFirebase() {
        let teamJSON = {
            teamName: this.teamName,
            roster: this.roster.playersArray,
            schedule: this.schedule.gamesArray,
            teamStats: this.teamStats
        };
        console.log('saving to firebase: ', teamJSON);
        // Create a reference to the team doc
        let teamDocRef = db.collection("Teams").doc("currentTeam");

        await teamDocRef.update(teamJSON);

    }

}

class Roster {
    constructor(rosterArray) {
        if (rosterArray.length === 0) this.playersArray = [];
        else {
            console.log("here");
            this.playersArray = rosterArray;
        }

    }

    //add player to roster
    addPlayer(playerObject) {
        if(this.playersArray.length === 0) {
            this.playersArray.push(playerObject);
            console.log('initialized first player');
            return;
        }
        for(let i = 0; i < this.playersArray.length; i++) {
            if (this.playersArray[i].jersey > playerObject.jersey) {
                this.playersArray.splice(i, 0, playerObject);
                console.log(`spliced a game in the ${i}th position`);
                return;
            }
        }
        this.playersArray.splice(this.playersArray.length, 0, playerObject);
        console.log(`spliced a player at the end`);
    }

    //find player in roster
    findPlayerIndex(id) {
        for(let i = 0; i < this.playersArray.length; i++) {
            if(this.playersArray[i].id === id
                && this.playersArray[i].removed === false) {
                return i;
            }
        }
        return -1;
    }

    //remove player in roster
    removePlayer(id) {
        let index = this.findPlayerIndex(id);
        if(index !== -1) this.playersArray[index].removed = true;
    }

    //update player in roster
    updatePlayer(id, playerObject) {
        let index = this.findPlayerIndex(id);
        if(index !== -1) {
            this.playersArray.splice(index, 1);
            this.addPlayer(playerObject);
        }
    }

    //create playerObject
    createPlayerObject(fName, lName, email, dob, jersey, position, captain, playerStats) {
        return {
            id : fName + lName + jersey,
            removed : false,
            playerFName : fName,
            playerLName : lName,
            playerEmail : email,
            playerBDay : dob,
            playerNumber : jersey,
            position : position,
            captain : captain,
            playerStats: playerStats,
        }
    }

}

class Player {
    constructor(fName, lName, email, dob, jersey, position, captain) {
        this.id = fName + lName + jersey;
        this.removed = false;
        this.playerFName = fName;
        this.playerLName = lName;
        this.playerEmail = email;
        this.playerBDay = dob;
        this.playerNumber = jersey;
        this.position = position;
        this.captain = captain;
        this.goals = 0;
        this.assists = 0;
        this.fouls = 0;
        this.yellow = 0;
        this.red = 0;
        this.gamesPlayed = 0;
    }

}

class Schedule {
    constructor(scheduleArray) {
        if(scheduleArray.length === 0) this.gamesArray = [];
        else {
            this.gamesArray = scheduleArray;
        }
    }

    //add Game
    addGame(gameObject) {
        if(this.gamesArray.length === 0) {
            this.gamesArray.push(gameObject);
            console.log('initialized first game');
            return;
        }
        for (let i = 0; i < this.gamesArray.length; i++) {
            if (this.gamesArray[i].date > gameObject.date) {
                this.gamesArray.splice(i, 0, gameObject);
                console.log(`spliced a game in the ${i}th position`);
                return;
            }
        }
        this.gamesArray.splice(this.gamesArray.length, 0, gameObject);
        console.log(`spliced a game at the back`);
    }

    //find Game
    findGameIndex(id) {
        for(let i = 0; i < this.gamesArray.length; i++) {
            if(this.gamesArray[i].id === id
                && this.gamesArray[i].removed === false) {
                return i;
            }
        }
        return -1;
    }

    //remove Game
    removeGame(id) {
        let index = this.findGameIndex(id);
        if(index !== -1) this.gamesArray[index].removed = true;
    }

    //update Game
    updateGame(id, gameObject) {
        let index = this.findGameIndex(id);
        if(index !== -1) {
            this.gamesArray.splice(index, 1);
            this.addGame(gameObject);
        }
    }

    //get Game ID
    getGameID(opponent, date) {
        return `${opponent} At ${date}`.replace(/\s+/g, '');
    }

    //create a game object
    createGameObject(opponent, date, location, homeOrAway, stats) {
        let newID = this.getGameID(opponent,date);
        return {
            id: newID,
            removed: false,
            opponent: opponent,
            date: date,
            location: location,
            homeOrAway: homeOrAway,
            gameStats: stats
        }
    }

    getNextGame() {
        //replace this with a thing that finds the next game
        //return a game object
        let now = Date.now();
        for(let i = 0; i < this.gamesArray.length; i++) {
            if(this.gamesArray[i].date > now
                && this.gamesArray[i].removed === false) {
                return this.gamesArray[i];
            }
        }
        /*
        return {
            id: 'test',
            removed: false,
            opponent: "Team Suck",
            date: "11/24 at 8pm",
            location: "the park",
            homeOrAway: "Home",
            gameStats: null
        }
        */
    }
}

//testing methods
function initializeTeam() {
    let teamJSON = {
        teamName: "Team XYZ",
        roster: [],
        schedule: [],
        teamStats: {
            wins: 0, losses: 0, ties: 0, goalsFor: 0, goalsAgainst: 0
        }
    };
    window.localStorage.setItem("Team", JSON.stringify(teamJSON));
    currentTeam = new Team(teamJSON);
    console.log("initialized the team");
}

function changeUserPrivledge(user) {
    currentUser.userWho = user;
    window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
    console.log(`changed ${currentUser.username} to ${user}`);
}

//initialize the team from the database
let currentTeam = undefined;

if(window.localStorage.getItem("currentTeam")) {
    let teamJSON = JSON.parse(window.localStorage.getItem("currentTeam"));
    currentTeam = new Team(teamJSON);
}

//listen to any changes in the team from firebase
db.collection("Teams").doc("currentTeam")
    .onSnapshot(function(doc) {
        console.log("We just got some realtime updates: ", doc && doc.data());
        console.log("Updating local team.")
        window.localStorage.setItem("currentTeam", JSON.stringify(doc.data()));
    });

/*else {
    let teamJSON = {
        teamName: "Team XYZ",
        roster: [],
        schedule: [],
        teamStats: {
            wins: 0, losses: 0, ties: 0, goalsFor: 0, goalsAgainst: 0
        }
    };
    window.localStorage.setItem("Team", JSON.stringify(teamJSON));
    currentTeam = new Team(teamJSON);
}*/

//initialize the current user from the database
let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
