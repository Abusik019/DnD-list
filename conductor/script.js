//aside movement
const aside = document.querySelector('.aside');
const main = document.querySelector('.main');
const trigger = document.querySelector('.pane_trigger');
let isResizing = false;
let startX, initialWidth;


trigger.addEventListener('mousedown', startResize);
document.addEventListener('mouseup', stopResize);
document.addEventListener('mousemove', resize);

function startResize(event){
    isResizing = true;
    startX = event.pageX;
    initialWidth = aside.offsetWidth;
    event.preventDefault();

    trigger.classList.add('active');
}

function resize(event){
    if(isResizing){
        const newWidth = Math.min(Math.max(initialWidth + (event.pageX - startX), 250), 500);
        aside.style.width = newWidth + 'px'
        main.style.width = `calc(100% - ${newWidth}px)`

        trigger.style.left = `calc(${newWidth}px - 4px)`
    }
}

function stopResize(){
    isResizing = false;
    trigger.classList.remove('active');
}


//create file or folder
const createBtn = document.getElementById('create');

createBtn.addEventListener('click', () => {

});