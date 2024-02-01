// const dropArea = document.getElementById('drop-area');

// ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//     dropArea.addEventListener(eventName, preventDefaults, false);
//     document.body.addEventListener(eventName, preventDefaults, false)
// })

// ;['dragenter', 'dragover'].forEach(eventName => {
//     dropArea.addEventListener(eventName, highlight, false);
// })

// ;['dragleave', 'drop'].forEach(eventName => {
//     dropArea.addEventListener(eventName, unhighlight, false);
// })

// function preventDefaults(e){
//     e.preventDefault();
//     e.stopPropagation();
// }

// function highlight(e){
//     dropArea.classList.add('highlight');
// }

// function unhighlight(e){
//     dropArea.classList.remove('highlight');
// }



// // Handle drop
// dropArea.addEventListener('drop', handleDrop, false)
// document.getElementById('fileInput').addEventListener('change', (e) => {
//     handleFiles(e.target.files)
// })

// function handleDrop(e){
//     const dt = e.dataTransfer
//     const files = dt.files

//     handleFiles(files)
// }


// let uploadProgress = [];
// const progressBar = document.getElementById('drop-progress');

// function initializeProgress(numFiles){
//     progressBar.value = 0;
//     uploadProgress = [];

//     for(let i = numFiles; i > 0; i--){
//         uploadProgress.push(0);
//     }
// }

// function updateProgress(fileNumber, percent){
//     uploadProgress[fileNumber] = percent;
//     let total = uploadProgress.reduce((acc, item) => acc + item, 0) / uploadProgress.length;

//     progressBar.value = total;
// }


// function handleFiles(files){
//     files = [...files];

//     initializeProgress(files.length);

//     files.forEach(uploadFile)
//     files.forEach(previewFile)
// }

// function sha1(inputString) {
//     const hash = CryptoJS.SHA1(inputString);
//     return hash.toString();
// }


// function uploadFile(file, i){
//     let url = 'https://api.cloudinary.com/v1_1/dcgvoappc/image/upload',
//         xhr = new XMLHttpRequest(),
//         formData = new FormData();

//     xhr.open('POST', url, true);
//     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

//     xhr.upload.addEventListener('progress', (e) => {
//         uploadProgress(i, (e.loaded * 100.0 / e.total) || 100);
//     })

//     xhr.addEventListener('readystatechange', (e) => {
//         if(xhr.readyState == 4 && xhr.status === 200){
//             updateProgress(i, 100);
//         }else{
//             console.log('error')
//         }
//     })

//     let timestamp = String(+new Date())

//     formData.append('api_key', 844661833655455)
//     formData.append('timestamp', timestamp)
//     formData.append('signature', CryptoJS.SHA256(
//         `timestamp=${timestamp}ZCqrF4QbKoxVVKwg8Z7D6vucGbw`
//        ).toString())

//     formData.append('file', file);

//     xhr.send(formData)
// }


// function previewFile(file){
//     let reader = new FileReader();

//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//         let img = document.createElement('img');
//         img.src = reader.result;
//         document.getElementById('gallery').appendChild(img)
//     }
// }

const   li = [...document.querySelectorAll('.dnd_refs > .dnd_item')],
        dndContainer = document.querySelector('.dnd_container');

li.forEach(liItem => {
    liItem.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging');
    })

    liItem.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    })
})

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dndContainer.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e){
    e.preventDefault();
    e.stopPropagation();
}

function isEmptyContainer(container){
    if(container.firstElementChild === null){
        const h1 = document.createElement('h1');
        h1.classList.add = 'empty';
        h1.textContent = 'empty list';
        container.appendChild(h1);
    }
}

dndContainer.addEventListener('dragenter', () => {
    dndContainer.style.backgroundColor = 'white';
})

dndContainer.addEventListener('dragleave', () => {
    dndContainer.style.backgroundColor = '#EFF2FF';
})

dndContainer.addEventListener('drop', () => {
    const dropElement = document.querySelector('.dnd_item.dragging');
    dropElement.setAttribute('draggable', false);

    const dndContainerArray = [...dndContainer.querySelectorAll('.dnd_item'), dropElement].sort((a, b) => a.outerText.localeCompare(b.outerText));
    dndContainer.innerHTML = '';
    
    dndContainerArray.forEach(item => {
        dndContainer.appendChild(item);
    })  

    isEmptyContainer(document.querySelector('.dnd_refs'));
})

isEmptyContainer(dndContainer);








