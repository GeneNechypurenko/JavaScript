const textContainer = document.getElementById('container');
let isEditing = false;

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'e') {
        event.preventDefault();
        if (!isEditing) {
            enterEditMode();
        }
    } else if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        if (isEditing) {
            saveAndExitEditMode();
        }
    }
});

function enterEditMode() {
    const text = textContainer.textContent;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textContainer.innerHTML = '';
    textContainer.appendChild(textarea);
    textarea.focus();
    isEditing = true;
}

function saveAndExitEditMode() {
    const textarea = textContainer.querySelector('textarea');
    const text = textarea.value;
    textContainer.innerHTML = text;
    isEditing = false;
}

function sortTable(columnIndex) {
    const table = document.getElementById("dataTable");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const isNumericColumn = !isNaN(rows[0].cells[columnIndex].textContent);

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent;
        const bText = b.cells[columnIndex].textContent;

        if (isNumericColumn) {
            return parseFloat(aText) - parseFloat(bText);
        } else {
            return aText.localeCompare(bText);
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}
