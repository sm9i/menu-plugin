
let clickedElement = null;

document.addEventListener('contextmenu', (event) => {
    clickedElement = event.target;
})

const actionHandle = {
    "menu-element-plugin-disabled": () => {
        clickedElement.removeAttribute('disabled')
    }
}


chrome.runtime.onMessage.addListener((action) => {
    if (action) {
        actionHandle[action]()
    }
})