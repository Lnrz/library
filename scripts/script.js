
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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

    insertPara.textContent = "Provide needed data to add a new book.";
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
    inputRadioFalse.checked = true;

    falseRadioLabel.textContent = "Not Read Yet";
    falseRadioLabel.setAttribute("for", "false");

    addBtn.textContent = "Add Book";
    addBtn.setAttribute("href", "#");
    addBtn.setAttribute("id", "addBtn");
    addBtn.setAttribute("type", "button");
    addBtn.addEventListener("click", addInputBook);

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
    const remove = document.createElement("p");

    blur.setAttribute("id", "blur");
    moreInfoWindow.setAttribute("id", "moreInfoWindow");
    moreInfoWindow.setAttribute("data-index", index);
    title.setAttribute("id", "titolo");
    pages.setAttribute("id", "pagine");
    author.setAttribute("id", "autore");
    read.setAttribute("id", "letto");
    cancel.setAttribute("id", "cancel");
    remove.setAttribute("id", "remove");

    title.classList.add("infoP");
    pages.classList.add("infoP");
    author.classList.add("infoP");
    read.classList.add("infoP");
    cancel.classList.add("infoP");
    remove.classList.add("infoP");

    title.innerHTML = "<span class='aqua'>Title:</span> " + myLibrary[index].title;
    pages.innerHTML = "<span class='aqua'>Pages:</span> " + myLibrary[index].pages;
    author.innerHTML = "<span class='aqua'>Author:</span> " + myLibrary[index].author;
    read.innerHTML = (myLibrary[index].read) ? "<span style='color:green;'>Read</span>" : "<span style='color:red;'>Not read yet</span>";
    cancel.innerHTML = "X";
    remove.innerHTML = "Delete Book";

    cancel.addEventListener("click", closeMoreInfo);
    remove.addEventListener("click", removeBook);

    moreInfoWindow.appendChild(title);
    moreInfoWindow.appendChild(pages);
    moreInfoWindow.appendChild(author);
    moreInfoWindow.appendChild(read);
    moreInfoWindow.appendChild(cancel);
    moreInfoWindow.appendChild(remove);
    blur.appendChild(moreInfoWindow);
    mainBody.appendChild(blur);
}

function addBookToLibrary(book) {

    const bookContainer = document.querySelector("#bookContainer");
    const aBook = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const moreInfoD = document.createElement("p");
    const readStatus = document.createElement("div");

    aBook.setAttribute("id", "aBook");
    aBook.setAttribute("data-index", newBookIndex);
    newBookIndex++;
    title.textContent = book.title;
    title.setAttribute("id", "title");
    author.textContent = book.author;
    author.setAttribute("id", "author");
    moreInfoD.textContent = "...";
    moreInfoD.setAttribute("id", "moreInfo");
    moreInfoD.addEventListener("click", moreInfo);
    readStatus.setAttribute("id", "readStatus");
    readStatus.style.backgroundColor = ((book.read) ? "green" : "red");
    readStatus.addEventListener("click", switchRead);

    aBook.appendChild(title);
    aBook.appendChild(author);
    aBook.appendChild(moreInfoD);
    aBook.appendChild(readStatus);
    bookContainer.appendChild(aBook);
}

function isValidBook(book) {
    if ( book.title != "" && book.author != "" && book.pages > 0) {
        return true;
    }
    return false;
}


function addInputBook() {

    const inputs = document.querySelectorAll("#insertForm input");
    let newBook = new Book();

    inputs.forEach(input => {
        if (input.type != "radio" || input.checked) {
            newBook[input.getAttribute("name")] = input.value;
        }
    });

    newBook.read = (newBook.read == "true") ? true : false;

    if (isValidBook(newBook)) {
        
        myLibrary.push(newBook);
        addBookToLibrary(newBook);
        updateLocalStorage();
        inputs.forEach(input => {
            if (input.type != "radio") {
                input.value = "";
            }
        });

    } else {
        alert("Inserted data are not valid");
    }
}

function switchRead(obj) {

    let readStatus = obj.target;

    readStatus.style.backgroundColor = 
        (
            (readStatus.style.backgroundColor == "red") ?
            "green" : "red"
        )
    ;
    
    let index = readStatus.parentNode.getAttribute("data-index");

    myLibrary[index].read = !myLibrary[index].read; 

    updateLocalStorage();
}

function removeBook(obj) {

    let index = obj.target.parentNode.getAttribute("data-index");

    closeMoreInfo();

    document.querySelectorAll("#aBook").forEach(book => {
        if (+(book.getAttribute("data-index")) > index) {
            book.setAttribute("data-index", +(book.getAttribute("data-index")) - 1)
        } else if (+(book.getAttribute("data-index")) == index) {
            book.remove();
        }
    })

    myLibrary.splice(index, 1);

    newBookIndex--;

    updateLocalStorage();
}
///////////////////////////////////////////////////////////////////////////////

let storageUsable = storageAvailable("localStorage");
let newBookIndex = 0; 
const myLibrary = (storageUsable && localStorage.length) ?
     JSON.parse(localStorage.getItem("myLibrary")) :
     []
;
myLibrary.forEach(book => addBookToLibrary(book));

document.querySelector("#slidingBtn")
    .addEventListener("click", slideIn, {once: true})
;