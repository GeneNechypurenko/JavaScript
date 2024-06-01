const textbox = document.getElementById('textbox');
    
textbox.addEventListener('input', function () {
    this.value = this.value.replace(/\d/g, '');
});

const headers = document.querySelectorAll('.header');

headers.forEach(header => {
    header.addEventListener('click', function () {

        const openContent = document.querySelector('.content.show');
        if (openContent && openContent !== this.nextElementSibling) {
            openContent.classList.remove('show');
            openContent.style.display = 'none';
        }

        const content = this.nextElementSibling;
        if (content.classList.contains('show')) {
            content.classList.remove('show');
            content.style.display = 'none';
        } else {
            content.classList.add('show');
            content.style.display = 'block';
        }
    });
});