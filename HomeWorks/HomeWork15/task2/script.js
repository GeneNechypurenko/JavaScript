"use strict";

const toggleArrow = $('#toggle_arrow').addClass('left');
const aside = $('aside');
const section = $('section')
let isDragging = false;
let startY, startHeight, startX, startWidth;
const asideTop = $('.aside_top');
const asideBot = $('.aside_bot');
const sectionTop = $('.section_top');
const sectionBot = $('.section_bot');

toggleArrow.click(function() {
    if (aside.width() > 0) {
        aside.width(0);
        section.width('100%');
        toggleArrow.removeClass('left')
        toggleArrow.addClass('right');
    } else {
        aside.width('calc(30% - 10px)');
        toggleArrow.removeClass('right');
        toggleArrow.addClass('left')
    }
});

$('.divider').on('mousedown', function(e) {
    isDragging = true;
    startY = e.clientY;
    startHeight = $(this).prev().height();
    $(document).on('mousemove', dragMove).on('mouseup', dragEnd);
});

function dragMove(e) {
    if (isDragging) {
        const offset = e.clientY - startY;
        const newHeight = startHeight + offset;
        if ($(e.target).closest('aside').length > 0) {
            asideTop.height(newHeight);
            asideBot.height(`calc(100% - ${newHeight}px - 20px)`);
        } else {
            sectionTop.height(newHeight);
            sectionBot.height(`calc(100% - ${newHeight}px - 20px)`);
        }
    }
}

function dragEnd() {
    isDragging = false;
    $(document).off('mousemove', dragMove).off('mouseup', dragEnd);
}