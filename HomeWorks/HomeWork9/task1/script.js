function validateForm() {
    let form = document.getElementById('registrationForm');
    let login = form.login.value.trim();
    let password = form.password.value;
    let confirmPassword = form.confirmPassword.value;
    let fullName = form.fullName.value.trim();
    let gender = form.gender.value;
    let specializations = form.querySelectorAll('input[name="specialization"]:checked');
    let position = form.position.value;

    let errors = [];

    if (!login) {
        errors.push('Логин обязателен для заполнения.');
    }

    if (!password) {
        errors.push('Пароль обязателен для заполнения.');
    } else if (password.length < 3 || password.length > 10) {
        errors.push('Пароль должен быть от 3 до 10 символов.');
    }

    if (!confirmPassword) {
        errors.push('Подтверждение пароля обязательно для заполнения.');
    } else if (password !== confirmPassword) {
        errors.push('Пароль и подтверждение не совпадают.');
    }

    if (!fullName) {
        errors.push('Полное имя обязательно для заполнения.');
    }

    if (!gender) {
        errors.push('Пол обязателен для выбора.');
    }

    if (specializations.length === 0) {
        errors.push('Необходимо выбрать хотя бы одну специализацию.');
    }

    if (!position) {
        errors.push('Должность обязательна для выбора.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }
    
    let dataWindow = window.open('', 'registrationData', 'width=600,height=400');
    let tableContent = `
        <table border="1">
            <tr><th>Логин</th><td>${login}</td></tr>
            <tr><th>Полное имя</th><td>${fullName}</td></tr>
            <tr><th>Пол</th><td>${gender}</td></tr>
            <tr><th>Специализация</th><td>${Array.from(specializations).map(s => s.value).join(', ')}</td></tr>
            <tr><th>Должность</th><td>${position}</td></tr>
        </table>
    `;
    dataWindow.document.write(tableContent);
}
