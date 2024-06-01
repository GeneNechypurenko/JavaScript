document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const resetButton = form.querySelector('button[type="reset"]');

    const savedData = getSavedData();
    if (savedData) {
        for (const [key, value] of Object.entries(savedData)) {
            const input = document.querySelector(`[name=${key}]`);
            if (input) {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = value === 'true';
                } else {
                    input.value = value;
                }
            }
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (data.password !== data.confirmPassword) {
            alert('Пароль и подтверждение не совпадают!');
            return;
        }

        saveData(data);
        alert('Информация сохранена!');
    });

    resetButton.addEventListener('click', function() {
        clearCookies();
    });

    function saveData(data) {
        for (const [key, value] of Object.entries(data)) {
            setCookie(key, value, 182);
        }
    }

    function getSavedData() {
        const cookies = document.cookie.split(';');
        const data = {};
        cookies.forEach(cookie => {
            const [key, value] = cookie.split('=');
            if (key && value) {
                data[key.trim()] = decodeURIComponent(value.trim());
            }
        });
        return data;
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }

    function clearCookies() {
        const cookies = document.cookie.split(";");
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        cookies.forEach(cookie => {
            const [name] = cookie.split("=");
            document.cookie = name + `=; expires=${pastDate.toUTCString()}; path=/;`;
        });
    }
});
