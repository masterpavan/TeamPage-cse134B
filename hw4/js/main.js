
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
        window.localStorage.setItem("Team", JSON.stringify(teamJSON));
        console.log("saved to database");
    }



}

class Roster {
     constructor(rosterArray) {
         //players is an array of Player objects
         if(rosterArray.length === 0) this.playersArray = [];
         else {
             this.playersArray = rosterArray.map(function (playerObject) {
                 return new Player(playerObject);
             });
         }
     }

     //add player

     //find player

     //remove player

     //update player

}

class Player {
    constructor(playerObject) {
        this.playerName = playerObject.playerName;
        this.playerNumber = playerObject.playerNumber;
        this.position = playerObject.position;
        this.playerStats = playerObject.playerStats;
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
        }
        for (let i = 0; i < this.gamesArray.length; i++) {
            if (this.gamesArray[i].date < gameObject.date) {
                this.gamesArray.splice(i + 1, 0, gameObject);
                console.log(`spliced a game in the ${i}th position`);
                return;
            }
        }
        this.gamesArray.splice(0, 0, gameObject);
        console.log(`spliced a game in the 0th position`);
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
        if(index !== -1) this.gamesArray[index] = gameObject;
    }

    //get Game ID
    getGameID(opponent, date) {
        return `${opponent} at ${date}`.replace(/\s+/g, '');
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
        return this.gamesArray[this.gamesArray.length - 1];
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

if(window.localStorage.getItem("Team")) {
    let teamJSON = JSON.parse(window.localStorage.getItem("Team"));
    currentTeam = new Team(teamJSON);
} else {
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
}

//initialize the current user from the database
let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));