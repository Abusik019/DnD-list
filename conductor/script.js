const aside = document.querySelector('.aside');
let isResizing = false;
let startX, initialWidth;

document.addEventListener('mousemove', (event) => {
    console.log(aside.offsetWidth)
    console.log(event.pageX)
    if (isResizing) {
        const newWidth = Math.max(initialWidth + (event.pageX - startX), 250);
        aside.style.width = newWidth + 'px';
    } else if (event.pageX < aside.offsetWidth && event.pageX > aside.offsetWidth - 10) {
        aside.style.cursor = 'w-resize';
        aside.addEventListener('mousedown', startResize);
    } else {
        aside.style.cursor = 'default';
        aside.removeEventListener('mousedown', startResize);
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    aside.style.cursor = 'default';
});

function startResize(event) {
    isResizing = true;
    startX = event.pageX;
    initialWidth = aside.offsetWidth;
    aside.style.cursor = 'w-resize';
}

