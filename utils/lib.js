export function decodeHTMLEntities(text) {
    const textArea = document.createElement('textArea');
    textArea.innerHTML = text;
    return textArea.value;
}

export function formatDate(date) {
    // Create a new Date object
    const dateObj = new Date(date);

    // Get the full month name, day, and year
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
}