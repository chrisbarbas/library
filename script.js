let myLibrary = [];

const form = document.querySelector('.book-form');
const book = document.querySelector('#book');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const table = document.querySelector('.table');

form.addEventListener('submit', (e) => {
    clearForm();
    checkInputs();
    buildTable();
    e.preventDefault();
});


const checkInputs = () => {
    const bookValue = book.value.trim();
    const authorValue = author.value.trim();
    const pagesValue = pages.value.trim();
    const readValue = read.value.trim();
    console.log(readValue)
    if (bookValue === '') {
        setErrorFor(book);
    }
    if (authorValue === '') {
        setErrorFor(author);
    }
    if (pagesValue === '') {
        setErrorFor(pages);
    }
    myLibrary.unshift(new Book(bookValue, authorValue, pagesValue, readValue))
}

const setErrorFor = (input) => {
    const formItem = input.parentElement;
    formItem.className = 'form-item error';
}

const clearForm = () => {
    const formItem = document.querySelectorAll('.form-item');
    formItem.className = ('form-item');
}

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const buildTable = () => {
    myLibrary.forEach((lib, index) => {
        //delete extra rows
        if (index > 0) {
            table.deleteRow(0);
        }
        //row
        let row = document.createElement('tr');
        row.dataset.index = index;
        //readbtn
        let readbtn = document.createElement('button');
        let readStatus = Object.values(lib).pop();
        if (readStatus === 'read') {
            readbtn.classList.add("read");
        }
        else if (readStatus === 'not read') {
            readbtn.classList.add("not-read");
        }
        console.log(lib.read)
        //delbtn
        let delbtn = document.createElement('button');
        delbtn.textContent = 'delete';
        //items within the rows
        let newArray = Object.values(lib).slice(0, 3);
        newArray.forEach(text => {
            // Object.values(lib).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        row.append(readbtn);
        row.append(delbtn);
        table.appendChild(row);
        console.log(row.dataset.index);
    });
};