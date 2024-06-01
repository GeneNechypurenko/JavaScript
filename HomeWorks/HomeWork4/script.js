document.addEventListener("DOMContentLoaded", function() {

    setupFolderClickHandlers();

    setupBookClickHandlers();

    setupResizableBlock();
});

function setupFolderClickHandlers() {
    const folders = document.querySelectorAll('.folder');
    
    folders.forEach(folder => {
        folder.addEventListener('click', function() {
            this.querySelector('ul').classList.toggle('collapsed');
        });
    });
}

function setupBookClickHandlers() {
    const books = document.querySelectorAll('.book');
    let lastClicked;

    books.forEach(book => {

        book.addEventListener('click', function(event) {

            if (event.ctrlKey) {
                this.classList.toggle('selected');

            } else if (event.shiftKey && lastClicked) {
                let isBetween = false;
                books.forEach(b => {

                    if (b === this || b === lastClicked) {
                        isBetween = !isBetween;
                    }

                    if (isBetween) {
                        b.classList.add('selected');
                    }
                });

            } else {
                books.forEach(b => {
                    b.classList.remove('selected');
                });

                this.classList.add('selected');
            }
            lastClicked = this;
        });
    });
}

function setupResizableBlock() {
    const resizable = document.getElementById('resizable');

    resizable.addEventListener('mousedown', function(event) {
        if (event.target === this) {
            const startX = event.clientX;
            const startY = event.clientY;
            const startWidth = parseInt(getComputedStyle(this).width, 10);
            const startHeight = parseInt(getComputedStyle(this).height, 10);

            const mouseMoveHandler = function(event) {
                const deltaX = event.clientX - startX;
                const deltaY = event.clientY - startY;

                resizable.style.width = startWidth + deltaX + 'px';
                resizable.style.height = startHeight + deltaY + 'px';
            };

            const mouseUpHandler = function() {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }
    });
}
