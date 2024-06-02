document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const form = document.getElementById("userInfoForm");
    loadUserInfo();

    document.getElementById("saveButton").addEventListener("click", function() {
        if (validateForm()) {
            saveUserInfo();
            alert("User information saved.");
        }
    });

    document.getElementById("exitButton").addEventListener("click", function() {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });

    function loadUserInfo() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            document.getElementById("firstName").value = userInfo.firstName || "";
            document.getElementById("lastName").value = userInfo.lastName || "";
            document.getElementById("birthYear").value = userInfo.birthYear || "";
            document.getElementById("gender").value = userInfo.gender || "male";
            document.getElementById("phone").value = userInfo.phone || "";
            document.getElementById("skype").value = userInfo.skype || "";
        }
    }

    function validateForm() {
        let valid = true;

        const firstName = document.getElementById("firstName").value;
        const firstNameError = document.getElementById("firstNameError");
        if (!/^[a-zA-Z]{1,20}$/.test(firstName)) {
            firstNameError.textContent = "First name must be up to 20 letters.";
            valid = false;
        } else {
            firstNameError.textContent = "";
        }

        const lastName = document.getElementById("lastName").value;
        const lastNameError = document.getElementById("lastNameError");
        if (!/^[a-zA-Z]{1,20}$/.test(lastName)) {
            lastNameError.textContent = "Last name must be up to 20 letters.";
            valid = false;
        } else {
            lastNameError.textContent = "";
        }

        const birthYear = document.getElementById("birthYear").value;
        const birthYearError = document.getElementById("birthYearError");
        const currentYear = new Date().getFullYear();
        if (birthYear < 1900 || birthYear > currentYear) {
            birthYearError.textContent = "Birth year must be between 1900 and the current year.";
            valid = false;
        } else {
            birthYearError.textContent = "";
        }

        const gender = document.getElementById("gender").value;
        const genderError = document.getElementById("genderError");
        if (gender !== "male" && gender !== "female") {
            genderError.textContent = "Gender must be selected.";
            valid = false;
        } else {
            genderError.textContent = "";
        }

        const phone = document.getElementById("phone").value;
        const phoneError = document.getElementById("phoneError");
        if (phone && !/^[\d\s()-]{10,12}$/.test(phone)) {
            phoneError.textContent = "Phone number must be between 10 and 12 digits and can include spaces, parentheses, and dashes.";
            valid = false;
        } else {
            phoneError.textContent = "";
        }

        const skype = document.getElementById("skype").value;
        const skypeError = document.getElementById("skypeError");
        if (skype && !/^[a-zA-Z0-9.-]+$/.test(skype)) {
            skypeError.textContent = "Skype ID can include letters, numbers, dots, and dashes.";
            valid = false;
        } else {
            skypeError.textContent = "";
        }

        return valid;
    }

    function saveUserInfo() {
        const userInfo = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            birthYear: document.getElementById("birthYear").value,
            gender: document.getElementById("gender").value,
            phone: document.getElementById("phone").value,
            skype: document.getElementById("skype").value,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
});
