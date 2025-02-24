const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";

const assetsURLMap = {
    "play": chrome.runtime.getURL("assets/play.png"),
    "delete": chrome.runtime.getURL("assets/delete.png")

}

const bookmarkSection = document.getElementById("bookmarks");

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || [];
        viewBookmarks(currentBookmarks);
    });
});

function viewBookmarks(bookmarks) {
    bookmarkSection.innerHTML = "";

    if(bookmarks.length === 0) {
        bookmarkSection.innerHTML = "<i>No Bookmarks to Show</i>";
        return;
    }

    bookmarks.forEach(bookmark => addNewBookmark(bookmark));

}

function addNewBookmark(bookmark){
    const newBookmark = document.createElement('div');
    const bookmarkTitle = document.createElement('div');
    const bookmarkControls = document.createElement('div');

    bookmarkTitle.textContent = bookmark.name;
    bookmarkTitle.classList.add("bookmark-title");

    setControlAttributes(assetsURLMap["play"], onPlay, bookmarkControls);
    setControlAttributes(assetsURLMap["delete"], onDelete, bookmarkControls);
    bookmarkControls.classList.add("bookmark-controls");
    
    newBookmark.classList.add("bookmark");

    newBookmark.append(bookmarkTitle);
    newBookmark.append(bookmarkControls);

    newBookmark.setAttribute("url", bookmark.url);
    newBookmark.setAttribute("bookmark-id", bookmark.id);

    bookmarkSection.appendChild(newBookmark);
}

function setControlAttributes(src, handler, parentDiv) {
    const controlElement = document.createElement("img");
    controlElement.src = src;
    controlElement.addEventListener("click", handler);
    parentDiv.appendChild(controlElement);
}

function onPlay(event) {
    const problemUrl = event.target.parentNode.parentNode.getAttribute("url");
    window.open(problemUrl, "_blank");
}

function onDelete(event){
    const bookmarkItem = event.target.parentNode.parentNode;
    const idToRemove = bookmarkItem.getAttribute("bookmark-id");
    bookmarkItem.remove();

    deleteItemFromStorage(idToRemove);
}

function deleteItemFromStorage(idToRemove){
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || [];
        const updatedBookmarks = currentBookmarks.filter((bookmark) => bookmark.id !== idToRemove);
        chrome.storage.sync.set({AZ_PROBLEM_KEY : updatedBookmarks});
    })
}