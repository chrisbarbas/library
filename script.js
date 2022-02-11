const form = document.querySelector('.book-form');
const book = document.querySelector('#book');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const table = document.querySelector('.table');

//form -> validate -> book constructor -> array -> table-builder
let myLibrary = [{
    name: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 310,
    read: 'read'
}];

let library = JSON.parse(localStorage.getItem('library'));
if (JSON.parse(localStorage.getItem('library') != null)) {
    myLibrary = library;
}

//book constructor for myLibrary
class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//accepts form info and sends to array
const checkInputs = () => {
    let messages = []
    const bookValue = book.value.trim();
    const authorValue = author.value.trim();
    const pagesValue = pages.value.trim();
    const readValue = read.value.trim();
    if (bookValue === '') {
        setErrorFor(book);
        messages.push('enter a book');
    } else {
        setSuccessFor(book)
    }
    if (authorValue === '') {
        setErrorFor(author);
        messages.push('enter an author');
    } else {
        setSuccessFor(author)
    }
    if (pagesValue === '') {
        setErrorFor(pages);
        messages.push('enter an author');
    } else {
        setSuccessFor(pages)
    }
    if (messages.length > 0) {
        return false;
    } else {
        myLibrary.unshift(new Book(bookValue, authorValue, pagesValue, readValue));
        updateLocal();
        return true;
    }
}

//builds the table looping the array
const buildTable = () => {
    //delete extra rows
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    myLibrary.forEach((lib, index) => {
        //row
        let row = document.createElement('tr');
        row.dataset.index = index;
        //read button
        let readbtn = document.createElement('button');
        let readStatus = Object.values(lib).pop();
        readbtn.textContent = readStatus;
        readbtn.className = 'read';
        if (readStatus === 'not read') {
            readbtn.className = 'not-read';
        }
        readbtn.addEventListener('click', readCheck);
        // delete button
        let delbtn = document.createElement('button');
        delbtn.textContent = 'delete';
        delbtn.classList.add('delete-toggle');
        delbtn.addEventListener('click', deleteCheck);
        //removes read text from array
        let newArray = Object.values(lib).slice(0, 3);
        //loops through the objects
        newArray.forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        row.append(readbtn);
        row.append(delbtn);
        table.appendChild(row);
    });
};

//submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkInputs()) { //if true
        buildTable();
        form.reset();
    }
});

//reverses class name, text, and array>object.read
function readCheck(e) {
    const item = e.target;
    let bookIndex = item.parentElement.dataset.index;
    let readClass = item.className;
    if (readClass === 'read') {
        console.log('red');
        item.className = 'not-read';
        item.textContent = 'not read';
        myLibrary[bookIndex].read = 'not read';
        updateLocal();
    } else {
        console.log('blue');
        item.className = 'read';
        item.textContent = 'read';
        myLibrary[bookIndex].read = 'read';
        updateLocal();
    }
}

//deletes the parent row and removes from array
function deleteCheck(e) {
    const item = e.target;
    let bookIndex = item.parentElement.dataset.index;
    item.parentElement.remove();
    myLibrary.splice(bookIndex, 1);
    updateLocal();
}

const setErrorFor = (input) => {
    const formItem = input.parentElement;
    formItem.className = 'form-item error';
}

const setSuccessFor = (input) => {
    const formItem = input.parentElement;
    formItem.className = 'form-item success';
}

function updateLocal() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

buildTable();