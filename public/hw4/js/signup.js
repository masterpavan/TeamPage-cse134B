let username = document.querySelector("#username");
let userEmail = document.querySelector("#userEmail");
let userFName = document.querySelector("#userFName");
let userLName = document.querySelector("#userLName");
let userPass = document.querySelector("#userPass");
let userPassConf = document.querySelector("#userPassConf");

function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function errorInForm() {
    if(!username.value) return true;
    if(!userEmail.value) return true;
    if(!userFName.value) return true;
    if(!userLName.value) return true;
    if(!userPass.value) return true;
}

function printErrorMessage() {
    console.log("fix your input");
}


function addUser(user) {
    //add the user
    let users = JSON.parse(window.localStorage.getItem("users"));
    users[user.username] = user;
    window.localStorage.setItem("users", JSON.stringify(users));
    console.log("added user to storage");
}

document.querySelector('#signUp').addEventListener('click', function () {

    let userWho = document.querySelector("input[name=who]:checked");
    if(errorInForm()) printErrorMessage();
    else {
        user = {
            userID: uuid(),
            username: username.value,
            userEmail: userEmail.value,
            userFName: userFName.value,
            userLName: userLName.value,
            userPass: userPass.value,
            userWho: userWho.value
        };
        addUser(user);
        document.querySelector('#toLogin').click();
    }

});