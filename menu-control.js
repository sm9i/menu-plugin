
const menuList = [{
    id: "menu-element-plugin",
    title: "Element plugin",
    desc: "",
    children: [{
        id: "menu-element-plugin-disabled",
        title: "Open disabled",
    }]
}]


const addItem = item => chrome.contextMenus.create({
    id: item.id,
    title: item.title,
    contexts: item.contexts ?? ["all"],
    parentId: item.parentId
})

chrome.runtime.onInstalled.addListener(() => {
    menuList.forEach(item => {
        addItem(item)
        if (item.children) {
            item.children.forEach(child => {
                addItem({
                    ...child,
                    parentId: item.id
                })
            })
        }
    })
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, info.menuItemId)
});

