
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
            this.gamesArray = scheduleArray.map(function (gameObject) {
                return new Game(gameObject);
            });
        }
    }

    //add Game
    //find Game
    //remove Game
    //update Game

    getNextGame() {
        //replace this with a thing that finds the next game
        //return a game object
        return {
            opponent: "Team Suck",
            date: "11/24 at 8pm",
            location: "the park",
            homeOrAway: "Home"
        }
    }
}

class Game {
    constructor(matchObject) {
        this.opponent = matchObject.opponent;
        this.date = matchObject.date;
        this.location = matchObject.location;
        this.homeOrAway = matchObject.homeOrAway;
        this.gameStats = matchObject.gameStats;
    }
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