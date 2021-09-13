
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function slideIn(obj) {

    let target = obj.target;
    let parent = target.parentNode;

    parent.style.width = "15vw";
    target.style.left = "12.6vw";

    const insertForm = document.querySelector("#insertForm");
    const insertPara = document.createElement("p");
    const form = document.createElement("form");
    const titleLabel = document.createElement("label");
    const authorLabel = document.createElement("label");
    const pagesLabel = document.createElement("label");
    const trueRadioLabel = document.createElement("label");
    const falseRadioLabel = document.createElement("label");
    const inputTitle = document.createElement("input");
    const inputAuthor = document.createElement("input");
    const inputPages = document.createElement("input");
    const inputRadioTrue = document.createElement("input");
    const inputRadioFalse = document.createElement("input");
    const addBtn = document.createElement("button");
    const radioPara = document.createElement("p");

    insertPara.textContent = "Provide neede data to add a new book.";
    insertPara.setAttribute("id", "insertPara");

    titleLabel.textContent = "Book Title";
    titleLabel.setAttribute("for", "title");
    titleLabel.setAttribute("id", "titleLabel");

    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Monogatari");
    inputTitle.setAttribute("name", "title");

    authorLabel.textContent = "Author";
    authorLabel.setAttribute("for", "author");
    authorLabel.setAttribute("id", "authorLabel");

    inputAuthor.setAttribute("type", "text");
    inputAuthor.setAttribute("placeholder", "Nisioisin");
    inputAuthor.setAttribute("name", "author");

    pagesLabel.textContent = "Pages";
    pagesLabel.setAttribute("for", "pages");
    pagesLabel.setAttribute("id", "pagesLabel");

    inputPages.setAttribute("type", "text");
    inputPages.setAttribute("placeholder", "250");
    inputPages.setAttribute("name", "pages");

    radioPara.textContent = "Have you read it?";
    radioPara.setAttribute("id", "radioPara");

    inputRadioTrue.setAttribute("type", "radio");
    inputRadioTrue.setAttribute("name", "read");
    inputRadioTrue.setAttribute("value", "true");

    trueRadioLabel.textContent = "Read";
    trueRadioLabel.setAttribute("for", "true");

    inputRadioFalse.setAttribute("type", "radio");
    inputRadioFalse.setAttribute("name", "read");
    inputRadioFalse.setAttribute("value", "false");

    falseRadioLabel.textContent = "Not Read Yet";
    falseRadioLabel.setAttribute("for", "false");

    addBtn.textContent = "Add Book";
    addBtn.setAttribute("href", "#");
    addBtn.setAttribute("id", "addBtn");

    form.appendChild(titleLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(inputTitle);
    form.appendChild(document.createElement("br"));
    form.appendChild(authorLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(inputAuthor);
    form.appendChild(document.createElement("br"));
    form.appendChild(pagesLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(inputPages);
    form.appendChild(radioPara);
    form.appendChild(inputRadioTrue);
    form.appendChild(trueRadioLabel);
    form.appendChild(inputRadioFalse);
    form.appendChild(falseRadioLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(addBtn);

    insertForm.appendChild(insertPara);
    insertForm.appendChild(form);
    /**
     * inserire ricerca
    */

    target.textContent = "<<";
    target.addEventListener("click", slideOut, {once: true});
}

function slideOut(obj) {

    let target = obj.target;
    let parent = target.parentNode;

    parent.style.width = "3vw";
    target.style.left = "0.7vw";

    const insertForm = document.querySelector("#insertForm");
    
    while(insertForm.hasChildNodes()) {
        insertForm.removeChild(insertForm.firstChild);
    }
    /**
     * togliere ricerca
     */

    target.textContent = ">>";
    target.addEventListener("click", slideIn, {once: true});
}

function closeMoreInfo() {

    const mainBody = document.querySelector("#mainBody");
    const blur = document.querySelector("#blur");

    mainBody.removeChild(blur);
}

function moreInfo(obj) {

    const index = obj.target.parentNode.getAttribute("data-index");

    const mainBody = document.querySelector("#mainBody");
    const blur = document.createElement("div");
    const moreInfoWindow = document.createElement("div");
    const title = document.createElement("p");
    const pages = document.createElement("p");
    const author = document.createElement("p");
    const read = document.createElement("p");
    const cancel = document.createElement("p");

    blur.setAttribute("id", "blur");
    moreInfoWindow.setAttribute("id", "moreInfoWindow");
    title.setAttribute("id", "titolo");
    pages.setAttribute("id", "pagine");
    author.setAttribute("id", "autore");
    read.setAttribute("id", "letto");
    cancel.setAttribute("id", "cancel");

    title.classList.add("infoP");
    pages.classList.add("infoP");
    author.classList.add("infoP");
    read.classList.add("infoP");
    cancel.classList.add("infoP");

    title.innerHTML = "<span class='aqua'>Title:</span> " + myLibrary[index].title;
    pages.innerHTML = "<span class='aqua'>Pages:</span> " + myLibrary[index].pages;
    author.innerHTML = "<span class='aqua'>Author:</span> " + myLibrary[index].author;
    read.innerHTML = (myLibrary[index].read) ? "<span style='color:green;'>Read</span>" : "<span style='color:red;'>Not read yet</span>";
    cancel.innerHTML = "X";

    cancel.addEventListener("click", closeMoreInfo);

    moreInfoWindow.appendChild(title);
    moreInfoWindow.appendChild(pages);
    moreInfoWindow.appendChild(author);
    moreInfoWindow.appendChild(read);
    moreInfoWindow.appendChild(cancel);
    blur.appendChild(moreInfoWindow);
    mainBody.appendChild(blur);
}

function addBookToLibrary(book) {

    const bookContainer = document.querySelector("#bookContainer");
    const aBook = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const moreInfo = document.createElement("p");

    aBook.setAttribute("id", "aBook");
    aBook.setAttribute("data-index", newBookIndex);
    newBookIndex++;
    title.textContent = book.title;
    title.setAttribute("id", "title");
    author.textContent = book.author;
    author.setAttribute("id", "author");
    moreInfo.textContent = "...";
    moreInfo.setAttribute("id", "moreInfo");

    aBook.appendChild(title);
    aBook.appendChild(author);
    aBook.appendChild(moreInfo);
    bookContainer.appendChild(aBook);
}

///////////////////////////////////////////////////////////////////////////////

let newBookIndex = 0;
const myLibrary = [
    new Book("Bakemonogatari", "Nisioisin", 250, false),
    new Book("Re:zero 1°volume", "Nagatsuki", 200, true)
];

document.querySelector("#slidingBtn")
    .addEventListener("click", slideIn, {once: true})
;

myLibrary.forEach(book => addBookToLibrary(book));

document.querySelectorAll("#moreInfo")
    .forEach(x => x.addEventListener("click", moreInfo))
;