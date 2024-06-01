"use strict"

const formatButton = document.getElementById('formatButton');
const jsonInput = document.getElementById('jsonInput');
const resultBlock = document.getElementById('resultBlock');

formatButton.addEventListener('click', function () {
    const jsonString = jsonInput.value.trim();
    if (jsonString) {
        try {
            const jsonObject = JSON.parse(jsonString);
            const formattedJson = JSON.stringify(jsonObject, null, 4);
            resultBlock.textContent = formattedJson;
            resultBlock.style.color = 'black';
        } catch (e) {
            resultBlock.textContent = 'Error: Invalid JSON input!';
            resultBlock.style.color = 'red';
        }
    } else {
        resultBlock.textContent = 'Error: Input is empty!';
        resultBlock.style.color = 'red';
    }
});