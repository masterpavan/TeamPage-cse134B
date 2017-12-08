let userEmail = document.querySelector("#userEmail");
let userPass = document.querySelector("#userPass");
//initialize empty users db if there are no users
if(!window.localStorage.getItem("users")) {
    let users = {
        "test": {
            "userID":"test",
            "username":"test",
            "userEmail":"test@test.com",
            "userFName":"Test",
            "userLName":"Testerson",
            "userPass":"123",
            "userWho":"Coach"
        }
    };
    window.localStorage.setItem("users", JSON.stringify(users));
}

function errorInForm() {
    if(!userEmail.value) return true;
    if(!userPass.value) return true;
}

function printErrorMessage(errorMessage) {
    console.log("fix your input");
    document.querySelector('#errorSpace').innerHTML =
        `<blockquote>${errorMessage}</blockquote>`;
}




document.querySelector('#signIn').addEventListener('click', function () {

    if(errorInForm()) printErrorMessage("You must fill in all the forms.");
    else {
        firebase.auth().signInWithEmailAndPassword(userEmail.value, userPass.value).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/wrong-password') {
                printErrorMessage('Wrong password.');
            }
            else if (errorCode == 'auth/invalid-email') {
                printErrorMessage('Invalid email');
            }
            else if (errorCode == 'auth/user-not-found') {
                printErrorMessage('User not found. Try another one.');
            }
            else {
                //alert(errorMessage);
                console.log(error);
            }
        });

    }

        /*let dbUser = JSON.parse(window.localStorage.getItem("users"))[userEmail.value];
        if(dbUser) {
            console.log("user found");
            if(userPass.value === dbUser.userPass) {
                window.localStorage.setItem("currentUser", JSON.stringify(dbUser));
                document.querySelector('#toHomepage').click();
            } else {
                console.log('invalid password homie');
                printErrorMessage("Your password is incorrect");
            }
        } else {
            console.log("user not found");
            printErrorMessage("That user doesn't exist");
        }*/
}, false);

let currentUserEmail=undefined;
firebase.auth().signOut().then(function() {

    window.localStorage.setItem("currentUser", JSON.stringify({}));

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            //display loading circle

            // User is signed in.
            currentUserEmail = user.email;
            console.log(currentUserEmail);

            db.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    //console.log(doc.data());
                    if(doc.data().userEmail === currentUserEmail) {
                        currentUser = doc.data();
                        window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        document.querySelector('#toHomepage').click();
                    }
                });
            });

            //listen to any changes in the team from firebase
            db.collection("Teams").doc("currentTeam")
                .onSnapshot(function(doc) {
                    console.log("We just got some realtime updates: ", doc && doc.data());
                    console.log("Updating local team.");
                    window.localStorage.setItem("currentTeam", JSON.stringify(doc.data()));
                });

            /*let currentTeamRef = db.collection("Teams").doc("currentTeam");

            currentTeamRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("(INFO)[main.js] currentTeam exists. recieved: ", doc.data());
                    window.localStorage.setItem("currentTeam", JSON.stringify(doc.data()));
                } else {
                    console.log("(INFO)[main.js] currentTeam does not exist. initializing.");
                    let teamJSON = {
                        teamName: "Team XYZ",
                        roster: [],
                        schedule: [],
                        teamStats: {
                            wins: 0, losses: 0, ties: 0, goalsFor: 0, goalsAgainst: 0
                        }
                    };
                    db.collection("Teams").doc("currentTeam").set(teamJSON);
                    window.localStorage.setItem("currentTeam", JSON.stringify(teamJSON));
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });*/

        } else {
            // User is signed out.
        }
    });
}, function(error) {
});
