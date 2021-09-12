
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

    /**
     * inserire ricerca e aggiunta
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
    */

    target.textContent = "<<";
    target.addEventListener("click", slideOut, {once: true});
}

function slideOut(obj) {

    let target = obj.target;
    let parent = target.parentNode;

    parent.style.width = "3vw";
    target.style.left = "0.7vw";

    /**
     * togliere ricerca e aggiunta
     * 
     * 
     * 
     * 
     * 
     */

    target.textContent = ">>";
    target.addEventListener("click", slideIn, {once: true});
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
    new Book("Bakemonogatari", "Nisioisin", 250, false)
];

document.querySelector("#slidingBtn")
    .addEventListener("click", slideIn, {once: true})
;

myLibrary.forEach(book => addBookToLibrary(book));

document.querySelectorAll("#moreInfo")
    .forEach(x => x.addEventListener("click", moreInfo))
;