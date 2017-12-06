let userEmail = document.querySelector("#userEmail");
let userPass = document.querySelector("#userPass");
/*
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
*/
function errorInForm() {
    if(!userEmail.value) return true;
    if(!userPass.value) return true;
}

function printErrorMessage(errorMessage) {
    console.log("fix your input");
    document.querySelector('#errorSpace').innerHTML =
        `<blockquote>${errorMessage}</blockquote>`;
}
/*
document.querySelector('#signIn').addEventListener('click', function () {
    if(errorInForm()) printErrorMessage("You must fill in all the forms.");
    else {
        let dbUser = JSON.parse(window.localStorage.getItem("users"))[userEmail.value];

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
        }
    }
}, false);

*/
document.querySelector('#signIn').addEventListener('click', function () {
	console.log("start");
        if (errorInForm()) {
		printErrorMessage("You must fill in all the form.");
	}
        else {
	   console.log("in the else");
           firebase.auth().signInWithEmailAndPassword(userEmail.value, userPass.value).catch(function(error) {
			console.log("we in here");
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/wrong-password') {
                                alert('Wrong password.');
                        }
                        else if (errorCode == 'auth/invalid-email') {
                                alert('Invalid email.');
                        }
                        else if (errorCode == 'auth/user-not-found') {
                                alert('User not found.');
                        }
                        else {
                                alert(errorMessage);
				console.log("hereman");
                                console.log(error);
                        }
	  	if (!error) {
	    		console.log("here");
       	    		document.querySelector('#toHomepage').click();
   	 	 }
          });
        }	
});


