import PixabayAPI, { currentTerm } from "./Api.js";

export const searchTerm = document.querySelector('#termino');
export const result = document.querySelector('#resultado');
export const form = document.querySelector('#formulario');
export const paginationContainer = document.querySelector('#paginacion');

let pagination;

export function displayAlert(message) {
    const alert_div = document.createElement('p');
    alert_div.classList.add(
        'bg-red-100',
        'border-red-400',
        'text-red-700',
        'px-4',
        'py-3',
        'rounded',
        'max-w-lg',
        'mx-auto',
        'mt-6',
        'text-center',
        'ALERT'
    );

    alert_div.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class"block sm:inline>${message}</span>
    `;

    const appearTiming = 2.5;
    alert_div.style.animation = `fade-in-out ${appearTiming}s`;
    
    if (form.lastElementChild.classList.contains('ALERT')) {
        return;
    }

    form.appendChild(alert_div);

    setTimeout(() => {
        alert_div.remove();
    }, appearTiming*1000);
}

export function displayImages(imgData) {
    clearPrevImagesResult();
    console.log(imgData);

    imgData.forEach(img => {
        const {previewURL, likes, views, largeImageURL} = img;

        result.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">

                    <div class="p-4">
                        <p class="font-bold"> ${views} <span class="font-light">Views</span> </p>
                        <p class="font-bold"> ${likes} <span class="font-light">Likes</span> </p>
                    
                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-2" 
                            href="${largeImageURL}" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            Ver
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

export function getTotalPages(totalHits, recordsPerPage) {
    return parseInt(Math.ceil(totalHits / recordsPerPage));
}

export function *generatePagination(totalPages) {
    for (let x = 1;  x <= totalPages; x++) {
        yield x;
    }
}

export function displayPagination(totalPages) {
    pagination = generatePagination(totalPages);

    while(true) {
        const {value, done} = pagination.next();
        if (done) return;

        const pageBtn = document.createElement('a');
        pageBtn.classList.add(
            'siguiente',
            'bg-yellow-400',
            'px-4',
            'py-1',
            'mr-2',
            'font-bold',
            'mb-4',
            'rounded'
        );
        pageBtn.textContent = value;
        pageBtn.dataset.page = value;
        pageBtn.href = '#';

        pageBtn.onclick = () => {
            new PixabayAPI(currentTerm, value).search();
        };

        paginationContainer.appendChild(pageBtn);
    }
}

function clearPrevImagesResult() {
    result.innerHTML = null;
    paginationContainer.innerHTML = null;
}