//aside movement
const aside = document.querySelector('.aside');
const main = document.querySelector('.main');
const trigger = document.querySelector('.pane_trigger');
let isResizing = false;
let startX, initialWidth;


trigger.addEventListener('mousedown', startResize);
document.addEventListener('mouseup', stopResize);
document.addEventListener('mousemove', resize);

function startResize(event) {
    isResizing = true;
    startX = event.pageX;
    initialWidth = aside.offsetWidth;
    event.preventDefault();

    trigger.classList.add('active');
}

function resize(event) {
    if (isResizing) {
        const newWidth = Math.min(Math.max(initialWidth + (event.pageX - startX), 250), 500);
        aside.style.width = newWidth + 'px'
        main.style.width = `calc(100% - ${newWidth}px)`

        trigger.style.left = `calc(${newWidth}px - 4px)`
    }
}

function stopResize() {
    isResizing = false;
    trigger.classList.remove('active');
}


//create file or folder



function generateFolderStructure(rootFolder = 'Root', depth = 3, maxChildren = 4) {

    const generateFolders = (folder, currentDepth) => {
        if (currentDepth >= depth) {
            return [];
        }

        const numChildren = Math.floor(Math.random() * maxChildren);
        const children = Array.from({ length: numChildren }, (_, index) => {
            const childName = `${folder}/Folder_${index + 1}`;
            return {
                name: childName,
                children: generateFolders(childName, currentDepth + 1)
            }
        })

        return children;
    }

    return {
        name: rootFolder,
        children: generateFolders(rootFolder, 0)
    }
}


const   folderStructure = document.querySelector('.folder_structure'),
        folders = generateFolderStructure('Root', 10, 4);
        

function createFolderView(data, parentElement){
    const ul = document.createElement('ul');
    parentElement.appendChild(ul);

    data.children.forEach(child => {
        const li = document.createElement('li');
        ul.appendChild(li);

        const folderName = document.createElement('span');
        folderName.style.display = 'inline-block'

        if(child.children.length > 0){
            const openArrow = document.createElement('i');
            openArrow.className = 'open_arrow';
            openArrow.style.transform = 'rotateZ(90deg)'
            folderName.appendChild(openArrow);
        }

        folderName.innerHTML += child.name.split('/').pop();
        folderName.className = 'folder';
      
        li.appendChild(folderName);

        if(child.children.length > 0){
            createFolderView(child, li);
        }

        const arrows = document.querySelectorAll('.open_arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                if(folderStructure.firstElementChild.offsetHeight > folderStructure.offsetHeight){
                    aside.style.overflowY = 'scroll';
                    folderStructure.style.overflow = 'hidden';
                } else{
                    aside.style.overflowY = 'visible';
                    folderStructure.style.overflow = 'visible';
                }
            });
        });

        li.querySelector('i')?.addEventListener('click', () => {
            const sublist = li.querySelector('ul'),
                arrow = li.querySelector('i');
            
            if(!sublist?.style){
                sublist.style.display = 'none'
            }

            if(sublist){
                sublist.style.display = (sublist.style.display === 'none') ? 'block' : 'none';
                arrow.style.transform = (arrow.style.transform === 'rotateZ(0deg)') ? 'rotateZ(90deg)' : 'rotateZ(0deg)';
            }
        })
    });
}


const createBtn = document.getElementById('create');

console.log(folders)

createBtn.addEventListener('click', () => {
    createFolderView(folders, folderStructure)
    if(folderStructure.firstElementChild){
        if(folderStructure.firstElementChild.offsetHeight > folderStructure.offsetHeight){
            aside.style.overflowY = 'scroll';
            folderStructure.style.overflow = 'hidden';
        }
    }
});


