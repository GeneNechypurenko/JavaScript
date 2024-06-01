
function collectUserInfo() {
    var fullName = prompt("Enter your name:");
    var gender = prompt("Enter your gender:");
    var age = prompt("Enter your age:");
    var email = prompt("Enter your e-mail:");

    var confirmationMessage = "Name: " + fullName + "\nGender: " + gender + "\nAge: " + age + "\nE-mail: " + email;
    var isInfoCorrect = confirm(confirmationMessage + "\n\nIs information correct?");

    if (isInfoCorrect) {
        alert("Thank you for the provided information!");
    } else {
        collectUserInfo();
    }
}

function checkLuckyTicket() {
    var ticketNumber = parseInt(prompt("Enter the tram ticket number (six-digit number):"));

    var ticketStr = ticketNumber.toString();

    if (ticketStr.length !== 6) {
        alert("Incorrect ticket number format. Please enter a six-digit number.");
        return;
    }

    var firstHalf = parseInt(ticketStr.substring(0, 3));
    var secondHalf = parseInt(ticketStr.substring(3));

    if (firstHalf === secondHalf) {
        alert("Congratulations! Your ticket is lucky!");
    } else {
        alert("Unfortunately, your ticket is not lucky.");
    }
}

function guessNumber() {
    var min = 0;
    var max = 100;
    var guessed = false;

    while (!guessed) {
        var guess = Math.floor((min + max) / 2);
        var userFeedback = prompt("Is your number > " + guess + ", < " + guess + " or == " + guess + "?");

        if (userFeedback === ">") {
            min = guess + 1;
        } else if (userFeedback === "<") {
            max = guess - 1;
        } else if (userFeedback === "==") {
            guessed = true;
            alert("Hurray! I guessed the number!");
        } else {
            alert("Please enter one of the following values: '>', '<' or '=='.");
        }
    }
}
