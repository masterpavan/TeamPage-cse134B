let userEmail = document.querySelector("#userEmail");
let userPass = document.querySelector("#userPass");
//initialize empty users db if there are no users
if(!window.localStorage.getItem("users")) {
    let users = {};
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