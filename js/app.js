import PixabayAPI from "./Api.js";

import {form, searchTerm, result, displayAlert} from "./selectors.js";

const searchObj = {
    term: searchTerm.value
}

window.onload = () => {
    form.addEventListener('submit', search);
    searchTerm.addEventListener('input', updateObjState);
}

function updateObjState(ev) {
    searchObj[ev.target.name] = ev.target.value;
}
 
function search(ev) {
    ev.preventDefault();

    if (validateInput()) {
        new PixabayAPI(searchTerm.value).search();
    }
}

function validateInput() {
    if (!searchObj.term) {
        displayAlert('Campo vacío');
        return false;
    }
    return true;
}