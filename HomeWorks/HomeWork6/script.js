
const createButton = document.getElementById("createButton");
const appendText = document.getElementById("appendText");
const insertText = document.getElementById("insertText");
const editText = document.getElementById("editText");
const nestedText = document.getElementById("nestedText");

const output = document.querySelector(".output");
const createRadio = document.getElementById("create");
const appendRadio = document.getElementById("append");
const insertRadio = document.getElementById("insert");
const editRadio = document.getElementById("edit");
const nestedRadio = document.getElementById("nested");
const removeRadio = document.getElementById("remove");

createButton.addEventListener("click", function() {
    if (createRadio.checked) {
        const newList = document.createElement("ul");
        const li = document.createElement("li");
        newList.appendChild(li);
        li.textContent = "NewList";
        newList.classList.add("NewList");
        output.appendChild(newList);
        const br = document.createElement("br");
        output.appendChild(br);
    }
});

output.addEventListener("click", function(event) {
    if (appendRadio.checked && event.target.tagName === "LI") {
        const liText = appendText.value;
        const li = document.createElement("li");
        li.textContent = liText;

        event.target.appendChild(li);
    }
});    

output.addEventListener("click", function(event) {
    if (insertRadio.checked && event.target.tagName === "LI") {
        const liText = insertText.value;
        const li = document.createElement("li");
        li.textContent = liText;

        event.target.parentNode.insertBefore(li, event.target);
    }
}); 

output.addEventListener("click", function(event) {
    if (editRadio.checked && event.target.tagName === "LI") {
        const liText = editText.value;

        event.target.textContent = liText;
    }
}); 

output.addEventListener("click", function(event) {
    if (nestedRadio.checked && event.target.tagName === "LI") {
        const nestedList = document.createElement("ul");
        const li = document.createElement("li");
        nestedList.appendChild(li);
        li.textContent = nestedText.value;
        
        event.target.parentNode.appendChild(nestedList);
    }
}); 

output.addEventListener("click", function(event) {
    if (removeRadio.checked && event.target.tagName === "UL" || removeRadio.checked && event.target.tagName === "LI") {
        event.target.remove();
    }
});
