export const formatNumberToString = (number) => {
    if (number < 10) {
        return '0' + String(number);
    }
    return String(number);
}

export const toggleElement = (element) => {
    element.classList.toggle('hide');
}

export const toggleElementsArrayClass = (elements, className) => {
    for(let i=0; i<elements.length; i++) {
        elements[i].classList.toggle(className);
    }
}