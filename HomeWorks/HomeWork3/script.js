const dates = document.querySelector('.dates');
const header = document.querySelector('.calendar h3');
const navi = document.querySelectorAll('#next, #prev');

const months =
[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {

    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const end = new Date(year, month, endDate).getDay();
    const endDatePrev = new Date(year, month, 0).getDate();

    let datesHTML = "";

    for(let i = start; i > 0; i--) {

        datesHTML += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

    for(let i = 1; i <= endDate; i++) {

        let className = 
            i === date.getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
            ? ' class ="today"'
            : "";
        
        datesHTML += `<li${className}>${i}</li>`;
    }

    for(let i = end; i < 6; i++) {
        
        datesHTML += `<li class="inactive">${i - end + 1}</li>`;
    }

    dates.innerHTML = datesHTML;
    header.textContent = `${months[month]} ${year}`;

    setCalendarBackground(month)
    setWeekdaysColor();
}

function setWeekdaysColor() {

    const daysOfWeek = document.querySelectorAll('.days li');
    const datesList = document.querySelectorAll('.dates li');

    const saturdayIndex = 5;
    const sundayIndex = 6;

    if (!daysOfWeek[saturdayIndex].classList.contains('inactive')) {
        daysOfWeek[saturdayIndex].classList.add('weekend');
    }

    if (!daysOfWeek[sundayIndex].classList.contains('inactive')) {
        daysOfWeek[sundayIndex].classList.add('weekend');
    }

    datesList.forEach((dateElement, index) => {
        if (!dateElement.classList.contains('inactive') && (index % 7 === saturdayIndex || index % 7 === sundayIndex)) {
            dateElement.classList.add('weekend');
        }
    });
}


function setCalendarBackground(monthIndex) {

    const calendarBackground = document.querySelector('.calendar');
    let backgroundImage = '';

    switch (monthIndex) {

        case 2:
        case 3: 
        case 4:
            backgroundColor = 'linear-gradient(steelblue, limegreen)';
            break;

        case 5:
        case 6:
        case 7:
            backgroundColor = 'linear-gradient(#ff5e88, #ff9966)';
            break;

        case 8:
        case 9:
        case 10:
            backgroundColor = 'linear-gradient(#ff9966, limegreen)';
            break;

        case 11:
        case 0: 
        case 1:
            backgroundColor = 'linear-gradient(steelblue, lightsteelblue)';
            break;
    }

    calendarBackground.style.background = `${backgroundColor}`;
}

navi.forEach(nav => {

    nav.addEventListener('click', e => {

        const btnId = e.target.id;

        if(btnId === 'prev' && month === 0) {
            year--;
            month = 11;
        }
        else if(btnId === 'next' && month === 11) {
            year++;
            month = 0;
        }
        else {
            month = (btnId === 'next') ? month + 1 : month - 1;
        }

        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();

        renderCalendar();
    });
});

renderCalendar();