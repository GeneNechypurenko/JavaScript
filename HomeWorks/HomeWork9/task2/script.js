const questions = [
    {
        question: "Что делает функция `alert` в JavaScript?",
        type: "radio",
        answers: [
            { text: "Выводит сообщение с запросом на ввод", correct: false },
            { text: "Выводит сообщение в модальном окне", correct: true },
            { text: "Выполняет функцию по расписанию", correct: false }
        ]
    },
    {
        question: "Как объявить переменную в JavaScript?",
        type: "radio",
        answers: [
            { text: "varName", correct: false },
            { text: "var varName", correct: true },
            { text: "variable varName", correct: false }
        ]
    },
    {
        question: "Какой оператор используется для строгого равенства?",
        type: "radio",
        answers: [
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false }
        ]
    },
    {
        question: "Что означает `NaN` в JavaScript?",
        type: "radio",
        answers: [
            { text: "Not-a-Number", correct: true },
            { text: "Null-and-Null", correct: false },
            { text: "Number-and-Number", correct: false }
        ]
    },
    {
        question: "Какие из следующих методов добавляют элемент в массив?",
        type: "checkbox",
        answers: [
            { text: "add()", correct: false },
            { text: "push()", correct: true },
            { text: "append()", correct: false },
            { text: "unshift()", correct: true }
        ]
    },
    {
        question: "Как объявить функцию в JavaScript?",
        type: "radio",
        answers: [
            { text: "function myFunction() {}", correct: true },
            { text: "def myFunction() {}", correct: false },
            { text: "func myFunction() {}", correct: false }
        ]
    },
    {
        question: "Что такое `this` в JavaScript?",
        type: "radio",
        answers: [
            { text: "Это ссылка на текущий HTML-документ", correct: false },
            { text: "Это ссылка на текущий объект", correct: true },
            { text: "Это ссылка на глобальный объект", correct: false }
        ]
    },
    {
        question: "Какие методы преобразуют JSON в JavaScript?",
        type: "checkbox",
        answers: [
            { text: "JSON.parse()", correct: true },
            { text: "JSON.stringify()", correct: false },
            { text: "JSON.convert()", correct: false },
            { text: "JSON.parseJSON()", correct: false }
        ]
    },
    {
        question: "Какие методы вызываются для получения текущей даты и времени?",
        type: "checkbox",
        answers: [
            { text: "new Date().getDate()", correct: false },
            { text: "new Date()", correct: true },
            { text: "new Date().now()", correct: false },
            { text: "Date.now()", correct: true }
        ]
    },
    {
        question: "Что означает ключевое слово `return` в функции?",
        type: "radio",
        answers: [
            { text: "Прерывает выполнение функции и возвращает значение", correct: true },
            { text: "Продолжает выполнение функции и возвращает значение", correct: false },
            { text: "Прерывает выполнение функции, но не возвращает значение", correct: false }
        ]
    }
];

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;

document.addEventListener("DOMContentLoaded", () => {
    startQuiz();
});

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    startTimer(20 * 60);
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    if (currentQuestionIndex < shuffledQuestions.length) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<h3>${currentQuestion.question}</h3>`;
        
        currentQuestion.answers.forEach((answer, index) => {
            const answerElement = document.createElement('div');
            answerElement.innerHTML = `
                <label>
                    <input type="${currentQuestion.type}" name="answer${currentQuestionIndex}" value="${index}">
                    ${answer.text}
                </label>
            `;
            questionElement.appendChild(answerElement);
        });

        questionContainer.appendChild(questionElement);
        document.getElementById('next-button').style.display = 'block';
    } else {
        endQuiz();
    }
}

function nextQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const selectedAnswers = Array.from(document.querySelectorAll(`input[name="answer${currentQuestionIndex}"]:checked`));
    
    if (selectedAnswers.length === 0) {
        alert('Пожалуйста, выберите ответ');
        return;
    }

    const correctAnswers = currentQuestion.answers.filter(answer => answer.correct);
    const selectedValues = selectedAnswers.map(answer => parseInt(answer.value));
    
    let allCorrect = true;
    if (currentQuestion.type === "checkbox") {
        if (selectedValues.length !== correctAnswers.length) {
            allCorrect = false;
        } else {
            selectedValues.forEach(value => {
                if (!currentQuestion.answers[value].correct) {
                    allCorrect = false;
                }
            });
        }
    } else {
        allCorrect = currentQuestion.answers[selectedValues[0]].correct;
    }

    if (allCorrect) {
        score++;
    }

    currentQuestionIndex++;
    showQuestion();
}

function startTimer(duration) {
    let timerDisplay = document.getElementById('timer');
    let timeRemaining = duration;
    
    timer = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerDisplay.textContent = `Оставшееся время: ${minutes}:${seconds}`;
        
        if (--timeRemaining < 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    const name = prompt("Введите ваше имя:");
    alert(`Поздравляем, ${name}! Тест сдан на ${score} из ${questions.length} баллов.`);
}