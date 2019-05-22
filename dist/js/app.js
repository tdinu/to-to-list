// 
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addItemBtn = document.getElementById("add-item-btn");

let CHECK = `fa-check-circle`;
let UNCHECK = `fa-circle`;
let LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};

const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const position = "beforeend";
    const item = `
        <li class="item" id="${id}">
            <i class="far ${DONE} co" job="complete"></i>
                
            <p class="text ${LINE}">${toDo}</p>

            <i class="fas fa-trash-alt de" job="delete"></i>
        </li>
    `;
    list.insertAdjacentHTML(position, item);
}

function addItem(event) {
    if (event.keyCode == 13 || event.type == "click") {
                const toDo = input.value;
        
                if (toDo) {
                    addToDo(toDo, id, false, false);
        
                    LIST.push({
                        name: toDo,
                        id: id,
                        done: false,
                        trash: false
                    });
                
                    localStorage.setItem("TODO", JSON.stringify(LIST));
                    
                    id++;
                }
                input.value = "";
                input.focus();
            }
}

document.addEventListener("keyup", addItem);
addItemBtn.addEventListener("click", addItem);

function completeToDo(element) {

    element.classList.toggle(CHECK);

    element.classList.toggle(UNCHECK);

    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.parentNode.id].done = LIST[element.parentNode.id].done ? false : true;
}

function removeToDo(element) {

    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.parentNode.id].trash = true;
}

list.addEventListener("click", function (event) {
    const element = event.target;

    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {

        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

