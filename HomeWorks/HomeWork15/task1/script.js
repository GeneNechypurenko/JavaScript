"use strict";

$('#generateButton').click(function() {
    const length = $('#length').val();
    const includeDigits = $('#includeDigits').is(':checked');
    const includeUppercase = $('#includeUppercase').is(':checked');
    const includeLowercase = $('#includeLowercase').is(':checked');
    
    const digits = '0123456789';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    
    let characters = '';
    if (includeDigits) characters += digits;
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    
    if (characters === '') {
        alert('Please select at least one character set.');
        return;
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    $('#result').val(result);
});
