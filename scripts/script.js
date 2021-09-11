
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

function addBookToLibrary() {

}

///////////////////////////////////////////////////////////////////////////////

const myLibrary = [];

document.querySelector("#slidingBtn")
    .addEventListener("click", slideIn, {once: true})
;