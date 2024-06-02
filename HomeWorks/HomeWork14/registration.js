document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("user")) {
        window.location.href = "user_info.html";
    }

    const form = document.getElementById("registrationForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            saveUserData();
            window.location.href = "user_info.html";
        }
    });

    function validateForm() {
        let valid = true;

        const email = document.getElementById("email").value;
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email) || email.length < 3) {
            emailError.textContent = "Invalid email format.";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        const password = document.getElementById("password").value;
        const passwordError = document.getElementById("passwordError");
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordPattern.test(password)) {
            passwordError.textContent = "Password must be at least 6 characters long and include 1 lowercase, 1 uppercase letter, and 1 number.";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        const confirmPassword = document.getElementById("confirmPassword").value;
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match.";
            valid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        return valid;
    }

    function saveUserData() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const user = {
            email: email,
            password: password
        };
        localStorage.setItem("user", JSON.stringify(user));
    }
});
