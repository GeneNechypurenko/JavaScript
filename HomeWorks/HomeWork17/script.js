let questions = [];
let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;

document.addEventListener("DOMContentLoaded", () => {
    fetchQuestions();
});

function fetchQuestions() {
    $.ajax({
        url: 'questions.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            questions = data;
            startQuiz();
        },
        error: function(error) {
            console.error("Ошибка при загрузке вопросов:", error);
        }
    });
}

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
