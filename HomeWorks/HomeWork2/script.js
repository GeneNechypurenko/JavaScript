// 1. Тест с вопросами "Да" и "Нет":
const questions = [
    "Вам нравится JavaScript?",
    "Вы любите программировать?",
    "Вы готовы учиться новому?"
];

const answers = [];

function startTest() {
    for (let i = 0; i < questions.length; i++) {
        const answer = prompt(questions[i]);
        answers.push(answer.toLowerCase() === "да");
    }
    
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i]) {
            score++;
        }
    }
    
    alert(`Ваш результат: ${score}/${questions.length}`);
}

startTest();

// 2. Проверка ввода ФИО на наличие недопустимых символов:
function validateFullName(fullName) {
    const pattern = /^[a-zA-Zа-яА-Я .]+$/;
    return pattern.test(fullName);
}

const userInput = prompt("Введите ваше ФИО:");
if (validateFullName(userInput)) {
    alert("Введено корректное ФИО.");
} else {
    alert("Некорректный ввод. ФИО может содержать только буквы, пробелы и точки.");
}

// 3. Разделение http-адреса на составные части:
function parseURL(url) {
    const parts = {};
    const splitURL = url.split("://");
    parts.protocol = splitURL[0];
    const remainingURL = splitURL[1].split("/");
    parts.host = remainingURL[0];
    parts.path = remainingURL.slice(1, -1).join("/");
    const fileAndQuery = remainingURL[remainingURL.length - 1].split("?");
    parts.fileName = fileAndQuery[0];
    parts.queryString = fileAndQuery[1] || "";
    return parts;
}

const url = "http://www.ufa.com.ua/utilites/hdd/out.php?sort=2";
const parsedURL = parseURL(url);

const urlContainer = document.getElementById("url-container");
urlContainer.innerHTML = `
    <p><strong>Протокол:</strong> ${parsedURL.protocol}</p>
    <p><strong>Хост:</strong> ${parsedURL.host}</p>
    <p><strong>Путь:</strong> ${parsedURL.path}</p>
    <p><strong>Имя файла:</strong> ${parsedURL.fileName}</p>
    <p><strong>Строка запроса:</strong> ${parsedURL.queryString}</p>
`;

// 4. Вывод шахматной доски на страницу, используя DOM:
const chessboard = document.getElementById("chessboard");

function createChessboard() {
    for (let i = 0; i < 8; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if ((i + j) % 2 === 0) {
                cell.classList.add("white");
            } else {
                cell.classList.add("black");
            }
            row.appendChild(cell);
        }
        chessboard.appendChild(row);
    }
}
createChessboard();
