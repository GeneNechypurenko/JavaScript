class ExtendedDate extends Date {
    getDateText() {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const day = this.getDate();
        const month = months[this.getMonth()];
        return `${day} ${month}`;
    }

    isFuture() {
        const now = new Date();
        return this >= now;
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getNextDate() {
        const nextDate = new Date(this);
        nextDate.setDate(this.getDate() + 1);
        return nextDate;
    }
}

document.getElementById('dateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dateInput = document.getElementById('dateInput').value;
    if (dateInput) {
        const [year, month, day] = dateInput.split('-').map(Number);
        const myDate = new ExtendedDate(year, month - 1, day);

        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `
            <p>Date Text: ${myDate.getDateText()}</p>
            <p>Is Future: ${myDate.isFuture()}</p>
            <p>Is Leap Year: ${myDate.isLeapYear()}</p>
            <p>Next Date: ${myDate.getNextDate().toLocaleDateString()}</p>
        `;
    }
});
