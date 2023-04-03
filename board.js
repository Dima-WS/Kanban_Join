"use strict"

// let boardContent = [
//     {
//         "color": "color1",
//         "heading": "ToDo",
//         "category": "Design",
//         "title": "Website redesign",
//         "description": "Modify the contents of the main website...",
//         "subtasks": [],
//         "prioWord": "Urgent",
//         "names": ["Wladimir Putin", "Recep Erdogan"],
//         "date": "27.03.2023"
//     },

//     {
//         "color": "color2",
//         "heading": "InProgress",
//         "category": "Sales",
//         "title": "Call potential clients",
//         "description": "Make the product presentation to prospective buyers",
//         "subtasks": [],
//         "prioWord": "Low",
//         "names": ["Olaf Scholz"],
//         "date": "29.03.2023"
//     },

//     {
//         "color": "color3",
//         "heading": "AwaitingFeedback",
//         "category": "Backoffice",
//         "title": "Accounting invoices",
//         "description": "Write open invoices for customer",
//         "subtasks": [{"Send invoices to customer": false}, {"Offer customer a installment plan": true}],
//         "prioWord": "Medium",
//         "names": ["Wladimir Putin", "Recep Erdogan", "Olaf Scholz"],
//         "date": "24.03.2023"
//     },

//     {
//         "color": "color4",
//         "heading": "Done",
//         "category": "Marketing",
//         "title": "Social media strategy",
//         "description": "Develop an ad campaign for brand positioning",
//         "subtasks": [],
//         "prioWord": "Urgent",
//         "names": ["Wladimir Putin", "Olaf Scholz"],
//         "date": "26.03.2023"
//     }
// ]

let namesColor = {
    "Wladimir Putin": "#ffa800",
    "Recep Erdogan": "#0232cf",
    "Olaf Scholz": "#800080",
}

let boardContent;
let subtaskArray = [];
let chooseColor;
let selectedColor;
let currentDraggedElement;
let rotatable;
let isDraggable;
let setPrio;

function render() {   
    loadBoardContent();
    
    document.getElementById("content").innerHTML = /*html*/ `
    <div class="heading">
        <h1>Board</h1>
        <div>
            <img class="garbageIcon" src="img/board/garbageIcon.png" alt="Garbage-Icon" ondragover="deleteTask(index)">
            <input id="searchInput" type="text" placeholder="Find task" oninput="searchTasks()">
            <button id="btn" onmouseover="btnOver()" onmouseout="btnOut()" onmousedown="btnDown()" onmouseup="btnUp()" onclick="render_addTask()">Add task<img src="img/board/buttonPlus.png" alt="Plus-Symbol"></button>
        </div>
    </div>

    <div id="mainContent">
        <div class="column marginRight">
            <h2>To Do</h2>
            <div id="ToDo" ondrop="moveTo('ToDo')" ondrop="allowDrop(event)"></div>
        </div>
        <div class="column marginRight">
            <h2>In Progress</h2>
            <div id="InProgress" ondrop="moveTo('InProgress')" ondragover="allowDrop(event)"></div>
        </div>
        <div class="column marginRight">
            <h2>Awaiting Feedback</h2>
            <div id="AwaitingFeedback" ondrop="moveTo('AwaitingFeedback')" ondragover="allowDrop(event)"></div>        
        </div>
        <div class="column">
            <h2>Done</h2>
            <div id="Done" ondrop="moveTo('Done')" ondragover="allowDrop(event)"></div>
        </div>
    </div>
    `;

    createMainContent();
    saveBoardContent();
}

function createMainContent() {
    for (let i = 0; i < boardContent.length; i++) {
        document.getElementById(boardContent[i].heading).innerHTML += /*html*/ `
        <div id="task${i}" class="taskDiv" draggable="true" ondragstart="startDragging(${i})" onmouseover="hoverOn('task${i}')" onmouseout="hoverOut('task${i}')" onmousedown="rotateColumn('task${i}')" onmouseup="rotateColumnBack('task${i}')">
            <p class="category ${boardContent[i].color}">${boardContent[i].category}</p>
            <img src="img/board/editTask.png" alt="Edit-Icon" onmouseover="rotatable = false; isDraggable = false" onmouseout="rotatable = true; isDraggable = true" onclick="render_taskInfo(${i})">
            <p class="title">${boardContent[i].title}</p>
            <p class="description">${boardContent[i].description}</p>
            <div class="taskFooter">
                <div id="initials${i}" class="initialDiv"></div>
                <img src="${showPrioSymbol(i)}" alt="Priority-Symbol">
            </div>
        </div>
        `;
    }

    renderFirstLetters()
}

function showPrioSymbol(i) {
    if (boardContent[i].prioWord == "Urgent") {
        return "img/add_task/urgentSymbol.png"
    } else if (boardContent[i].prioWord == "Medium") {
        return "img/add_task/mediumSymbol.png"
    } else {
        return "img/add_task/lowSymbol.png"
    }
}

function renderFirstLetters() {
    for (let i = 0; i < boardContent.length; i++) {
        const names = boardContent[i].names;
        for (let j = 0; j < names.length; j++) {
            const currentName = names[j];
            const filterInitials = names[j].split(' ').map(name => name.charAt(0)).join('');
            document.getElementById(`initials${i}`).innerHTML += /*html*/ `
            <p id="initial${j}" class="initial" style='background-color:${namesColor[currentName]}; width: 2.5rem; height: 2.5rem'>${filterInitials}</p>
            `;
        }
    }
}  

function initials_priority() {
    document.getElementById("initials").innerHTML = `${boardContent[i].names.split(" ")}`;
}

function btnOver() {
    document.getElementById("btn").style.backgroundColor = "#29ABE2";
    document.getElementById("btn").style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.7)";
    document.getElementById("btn").style.transitionDuration = "0.2s";
}

function btnOut() {
    document.getElementById("btn").style.backgroundColor = "#2A3647";
    document.getElementById("btn").style.boxShadow = "none";
    document.getElementById("btn").style.transitionDuration = "0.2s";
}

function btnDown() {
    document.getElementById("btn").style.transform = "scale(0.97)";
    document.getElementById("btn").style.transitionDuration = "0.05s";
}

function btnUp() {
    document.getElementById("btn").style.transform = "scale(1)";
    document.getElementById("btn").style.transitionDuration = "0.05s";
}

function hoverOn(hoveredDiv) {
    let column = document.getElementById(hoveredDiv);

    let cssProperties = {
        "box-shadow": "3px 3px 3px #2A3647, -3px -3px 3px #2A3647, -3px 3px 3px #2A3647, 3px -3px 3px #2A3647",
        "transform": "scale(1.03)",
        "transition-duration": "0.2s",
        "cursor": "all-scroll"
    };

    Object.assign(column.style, cssProperties);
    if (hoveredDiv == "ToDo") {
        Object.assign(column.style, cssProperties);
    } else if (hoveredDiv == "InProgress") {
        Object.assign(column.style, cssProperties);
    } else if (hoveredDiv == "AwaitingFeedback") {
        Object.assign(column.style, cssProperties);
    } else if (hoveredDiv == "Done") {
        Object.assign(column.style, cssProperties);
    }
}

function hoverOut(outhoveredDiv) {
    let column = document.getElementById(outhoveredDiv);

    let cssProperties = {
        "box-shadow": "none",
        "transform": "scale(1)",
        "transition-duration": "0.2s"
    };

    Object.assign(column.style, cssProperties);
    if (outhoveredDiv == "ToDo") {
        Object.assign(column.style, cssProperties);
    } else if (outhoveredDiv == "InProgress") {
        Object.assign(column.style, cssProperties);
    } else if (outhoveredDiv == "AwaitingFeedback") {
        Object.assign(column.style, cssProperties);
    } else if (outhoveredDiv == "Done") {
        Object.assign(column.style, cssProperties);
    }
}

function rotateColumn(rotatedDiv) {
    if (rotatable==false) {
        return
    } else{
        document.getElementById(rotatedDiv).style.transform = "rotate(3deg)";
    }
}

function rotateColumnBack(rotatedBackDiv) {
    if (rotatable==false) {
        return
    } else{
        document.getElementById(rotatedBackDiv).style.transform = "rotate(0)";
        document.getElementById(rotatedBackDiv).style.transform = "scale(1.03)";    
    }
}

function searchTasks() {
    let input, filter, div, p, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
  
    for (let i = 0; i < boardContent.length; i++) {
      div = document.getElementById(`task${i}`);
      p = div.getElementsByTagName("p");
      let matchFound = false;
      for (let j = 0; j < p.length; j++) {
        txtValue = p[j].textContent || p[j].innerText;
        if (txtValue.toUpperCase().includes(filter)) {
          matchFound = true;
          break;
        }
      }
      if (matchFound) {
        div.style.display = "";
      } else {
        div.style.display = "none";
      }
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(heading) {
    if (isDraggable==false) {
        return
    } else {
        boardContent[currentDraggedElement]['heading'] = heading;
        saveBoardContent();
        render();
    }
}

function render_addTask() {
    document.getElementById("taskInfo").style.visibility = "hidden";
    document.getElementById("greyBackground").style.display = "flex";
    document.getElementById("addTask").style.visibility = "visible";
    document.getElementById("addTask").innerHTML = /*html*/ `
    <h2>Add Task<img src="img/board/closeIcon.png" alt="Close-Icon" onclick="close_addTask()"></h2>
    <div class="mainContent">
        <div class="leftPart">
            <p>Title</p>
            <input id="title" type="text" placeholder="Enter a title">
            <p>Description</p>
            <textarea id="description" cols="30" rows="10" placeholder="Enter a description"></textarea>
            <p>Category</p>
            <div id="category" class="categoryDiv" onclick="openCategory()">
                <div id="categoryTitle" class="inputCategoryAssignedTo">
                    <p id="selectCategory">Select task category</p>
                    <img id="rotateTriangle" src="img/add_task/openTriangle.png" alt="Open-Symbol">
                </div>
                <div id="categoryDiv"></div>
            </div>
            <div id="createCategory"></div>
            <div id="colorChoice"></div>
            <p>Assigned to</p>
            <div class="assignedToDiv">
                <div class="inputCategoryAssignedTo" onclick="openAssignedTo()">
                    <p>Select contacts to assign</p>
                    <img id="rotateTriangle2" src="img/add_task/openTriangle.png" alt="Open-Symbol">
                </div>
                <div id="assignedToDiv"></div>
            </div>
        </div>
        <img src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
        <div>
    </div>
        <div class="rightPart">
            <p>Due date</p>
            <input id="date" class="calendar" type="date" placeholder="dd/mm/yyyy">
            <p>Priority</p>
            <div class="prioDiv">
                <button id="urgent" class="prioButton urgent" onclick="pressButton('urgent')" onmouseover="upperButton('urgent')" onmouseout="lowerButton('urgent')">Urgent<img id="img_urgent" src="img/add_task/urgentSymbol.png" alt="Urgent-Symbol"></button>
                <button id="medium" class="prioButton medium" onclick="pressButton('medium')" onmouseover="upperButton('medium')" onmouseout="lowerButton('medium')">Medium<img id="img_medium" src="img/add_task/mediumSymbol.png" alt="Medium-Symbol"></button>
                <button id="low" class="prioButton low" onclick="pressButton('low')" onmouseover="upperButton('low')" onmouseout="lowerButton('low')">Low<img id="img_low" src="img/add_task/lowSymbol.png" alt="Low-Symbol"></button>
            </div>
            <p>Subtasks</p>
            <div class="subtaskDiv">
                <input id="subtaskInput" oninput="subtaskInput()" type="text" placeholder="Add new subtask">
                <div id="inputIcons">
                    <img src="img/add_task/addIcon.png" alt="Subtask-Symbol">
                </div>
            </div>
            <div id="addedSubtask"></div>
        </div>
        <div class="clearCreateButtons">
            <button id="clearBtn" class="clear" onmouseover="closeIconHoveredColor()" onmouseout="closeIconColorBack()" onclick="clearAllTask()">Clear<img id="closeIconClear" src="img/add_task/closeSymbol.png" alt="Close-Icon"></button>
            <button id="createBtn" class="create" onclick="createTask()">Create Task<img src="img/add_task/checkmarkSymbol.png" alt="Checkmark-Icon"></button>
        </div>
    </div>
    `;

    document.getElementById("createCategory").style.display = "none";
}

function createTask() {
    const title = document.getElementById("title").value;
    let selectedCategory;
    if (document.getElementById("categoryInput")) {
        selectedCategory = document.getElementById("categoryInput").value;
    } else if (document.getElementById("selectCategory")) {
        selectedCategory = document.getElementById("selectCategory").textContent;
    } else {
        alert("Please select or enter a category.")
        return
    }
    // const selectedCategory = document.getElementById("selectCategory").textContent;
    const description = document.getElementById("description").value;
    let assignedTo = [];
    for (let i = 0; i < document.getElementById("assignedToDiv").getElementsByTagName("p").length; i++) {
        if (document.getElementById(`assign_${i}`).checked) {
            const selectedAssignee = document.getElementById(`assigned_${i}`).innerHTML;
            assignedTo.push(selectedAssignee)
        }
    }
    let checkSubtask = [];
    for (let i = 0; i < document.getElementById("addedSubtask").getElementsByTagName("p").length; i++) {
        if (document.getElementById(`checkSubtask_${i}`).checked) {
            checkSubtask.push({[subtaskArray[i]]: true})
        } else {
            checkSubtask.push({[subtaskArray[i]]: false})
        }
    }

    const dateInput = document.getElementById("date").value;
    const dateParts = dateInput.split("-");
    const newDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

    if (title=="") {
        alert("Please enter a title.");
        return
    } else if (description==="") {
        alert("Please enter a description.");
        return
    } else if (selectedCategory==undefined) {
        alert("Please enter a category.");
        return
    } else if (selectedCategory==="Select task category" || selectedCategory==="") {
        alert("Please enter a category.");
        return
    } else if (dateInput==="") {
        alert("Please enter a date.");
        return
    } else if (setPrio===undefined) {
        alert("Please enter a priority.");
        return
    }
 
    if (selectedColor == undefined) {
        selectedColor = randColor();
    }

    boardContent.push({
        "color": selectedColor,
        "heading": "ToDo",
        "category": selectedCategory,
        "title": title,
        "description": description,
        "subtasks": checkSubtask,
        "prioWord": capitalizeFirstLetter(setPrio),
        "names": assignedTo,
        "date": newDate
    },)
    
    setPrio = undefined;
    subtaskArray = [];
    chooseColor = false;
    selectedColor = undefined;

    close_addTask();
    saveBoardContent();
    render();
}

function upperButton(hoveredPrio) {
    if (hoveredPrio === setPrio) {
        return
    }
    document.getElementById(hoveredPrio).style.boxShadow = "0 5px 5px #000";
    document.getElementById(hoveredPrio).style.transform = "translateY(-5%)";
    document.getElementById(hoveredPrio).style.transitionDuration = "0.2s";
}

function lowerButton(hoveredPrio) {
    document.getElementById(hoveredPrio).style.boxShadow = "none";
    document.getElementById(hoveredPrio).style.transform = "translateY(0)";
    document.getElementById(hoveredPrio).style.transitionDuration = "0.2s";
}

function pressButton(pressedBtn) {
    const urgentCSS = {
        "color": "#fff",
        "background-color": "#ff3d00",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };
    
    const mediumCSS = {
        "color": "#fff",
        "background-color": "#ffa800",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };
    
    const lowCSS = {
        "color": "#fff",
        "background-color": "#7ae229",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };
    
    const CSS_before = {
        "color": "#000",
        "background-color": "#fff"
    };
    
    let urgent = document.getElementById('urgent'); 
    Object.assign(urgent.style, CSS_before);
    let medium = document.getElementById('medium');
    Object.assign(medium.style, CSS_before);
    let low = document.getElementById('low');
    Object.assign(low.style, CSS_before);

    if (pressedBtn == "urgent") {
        Object.assign(urgent.style, urgentCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol_white.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol.png";
    } else if (pressedBtn == "medium") {
        Object.assign(medium.style, mediumCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol_white.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol.png";
    } else if (pressedBtn == "low") {
        Object.assign(low.style, lowCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol_white.png";
    }

    setPrio = pressedBtn;
}

function subtaskInput() {
    let input = document.getElementById("subtaskInput").value;
    let inputIcons = document.getElementById("inputIcons");

    if (input !== "") {
        inputIcons.innerHTML = /*html*/ `
        <div class="subtaskIcons">
            <img onclick="closeSubtaskIcons()" class="closeIcon" src="img/add_task/closeIcon.png" alt="Close-Icon">
            <img class="subtaskLine" src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
            <img onclick="createSubtask()" class="checkmarkIcon" src="img/add_task/checkmarkSymbolGrey.png" alt="Checkmark">
        </div>
        `;
        document.getElementById("subtaskInput").style.paddingRight = "4.5rem";
    } else if (input == "") {
        inputIcons.innerHTML = /*html*/ `
        <div id="inputIcons">
            <img id="addIcon" onclick="subtaskIcons()" src="img/add_task/addIcon.png" alt="Subtask-Symbol">
        </div>
        `;
    }
}

function closeSubtaskIcons() {
    document.getElementById("subtaskInput").value = "";
    setPrio = undefined;
    subtaskInput();
}

function createSubtask() {
    let inputValue = document.getElementById("subtaskInput").value;
    if (inputValue != "") {
        subtaskArray.push(inputValue);
    }
    document.getElementById("addedSubtask").innerHTML = "";

    for (let i = 0; i < subtaskArray.length; i++) {
        document.getElementById("addedSubtask").innerHTML += /*html*/ `
        <div id='subtaskContent_${i}' class="finishedSubtask">
            <input id='checkSubtask_${i}' type="checkbox">
            <p>${subtaskArray[i]}</p>
            <img onclick='deleteFinishedSubtask(${i})' src="img/add_task/closeSymbol.png" alt="Close-Icon">
        </div>
        `;
    }

    document.getElementById("subtaskInput").value = "";
    subtaskInput();
}

function deleteFinishedSubtask(i) {
    document.getElementById(`subtaskContent_${i}`).remove();
    subtaskArray.splice(i,1);
}

function openCategory() {
    if (document.getElementById("categoryDiv").innerHTML == "") {
        document.getElementById("categoryDiv").style.display = "flex";
        document.getElementById("categoryDiv").style.flexDirection = "column";
        document.getElementById("categoryTitle").style.paddingTop = "0.8rem";
        document.getElementById("categoryTitle").style.paddingBottom = "0.8rem";
        document.getElementById("rotateTriangle").style.transform = "rotate(180deg)";
        document.getElementById("categoryDiv").innerHTML = /*html*/ `
        <p class="grey" onclick="colorChoice()">New category</p>
        <p id="backoffice" class="orange" onclick="putInInput('backoffice', 'color1')">Backoffice<span class="selectColor turquoise_point"></span></p>
        <p id="design" class="turquoise" onclick="putInInput('design', 'color2')">Design<span class="selectColor orange_point"></span></p>
        <p id="marketing" class="blue" onclick="putInInput('marketing', 'color3')">Marketing<span class="selectColor blue_point"></span></p>
        <p id="media" class="yellow" onclick="putInInput('media', 'color4')">Media<span class="selectColor yellow_point"></span></p>
        <p id="sales" class="pink" onclick="putInInput('sales', 'color5')">Sales<span class="selectColor pink_point"></span></p>
        `;
        } else if (!document.getElementById("categoryDiv").innerHTML == "") {
            document.getElementById("categoryDiv").innerHTML = "";
            document.getElementById("rotateTriangle").style.transform = "rotate(360deg)";
        }
}

function colorChoice() {
    document.getElementById("categoryTitle").style.display = "none";
    document.getElementById("categoryTitle").style.margin = "0.8rem 0 1rem 0";
    document.getElementById("category").style.display = "none";
    document.getElementById("colorChoice").style.display = "flex";
    document.getElementById("createCategory").innerHTML = /*html*/ `
    <input id="categoryInput" class="categoryText" type="text" placeholder="New category name">
    <div class="subtaskIcons categoryIcons">
        <img onclick="returnCategory()" class="closeIcon" src="img/add_task/closeIcon.png" alt="Close-Icon">
        <img class="subtaskLine" src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
        <img class="checkmarkIcon" src="img/add_task/checkmarkSymbolGrey.png" alt="Checkmark">
    </div>
    `;
    document.getElementById("colorChoice").innerHTML = /*html*/ `
    <span id="color1" onmouseover="colorFocus('color1')" onmouseout="colorUnfocus('color1')" class="green newCategory" onclick="chosenColor('color1')"></span>
    <span id="color2" onmouseover="colorFocus('color2')" onmouseout="colorUnfocus('color2')" class="red newCategory" onclick="chosenColor('color2')"></span>
    <span id="color3" onmouseover="colorFocus('color3')" onmouseout="colorUnfocus('color3')" class="violet newCategory" onclick="chosenColor('color3')"></span>
    <span id="color4" onmouseover="colorFocus('color4')" onmouseout="colorUnfocus('color4')" class="brightBlue newCategory" onclick="chosenColor('color4')"></span>
    <span id="color5" onmouseover="colorFocus('color5')" onmouseout="colorUnfocus('color5')" class="darkYellow newCategory" onclick="chosenColor('color5')"></span>
    `;

    document.getElementById("createCategory").style.display = "flex";
}

function returnCategory() {
    document.getElementById("categoryInput").value = "";
    document.getElementById("colorChoice").style.display = "none";
    render();
    render_addTask();
}

function colorFocus(hoveredColor) {
    let hoverIn = {
        "transform": "scale(1.4)",
        "transition-duration": "0.15s",
        "border": "1px solid #000"
    };

    let color_1 = document.getElementById("color1");
    let color_2 = document.getElementById("color2");
    let color_3 = document.getElementById("color3");
    let color_4 = document.getElementById("color4");
    let color_5 = document.getElementById("color5");

    if (hoveredColor == "color1") {
        Object.assign(color_1.style, hoverIn);
    } else if (hoveredColor == "color2") {
        Object.assign(color_2.style, hoverIn);
    } else if (hoveredColor == "color3") {
        Object.assign(color_3.style, hoverIn);
    } else if (hoveredColor == "color4") {
        Object.assign(color_4.style, hoverIn);
    } else if (hoveredColor == "color5") {
        Object.assign(color_5.style, hoverIn);
    }
}

function chosenColor(chosenColor) {
    let hoverIn = {
        "transform": "scale(1.4)",
        "transition-duration": "0.15s",
        "border": "1px solid #000"
    };

    selectedColor = chosenColor;

    let color_1 = document.getElementById("color1");
    let color_2 = document.getElementById("color2");
    let color_3 = document.getElementById("color3");
    let color_4 = document.getElementById("color4");
    let color_5 = document.getElementById("color5");

    if (chosenColor == "color1") {
        Object.assign(color_1.style, hoverIn);
    } else if (chosenColor == "color2") {
        Object.assign(color_2.style, hoverIn);
    } else if (chosenColor == "color3") {
        Object.assign(color_3.style, hoverIn);
    } else if (chosenColor == "color4") {
        Object.assign(color_4.style, hoverIn);
    } else if (chosenColor == "color5") {
        Object.assign(color_5.style, hoverIn);
    }
}

function colorUnfocus(unhoveredColor) {
    let hoverOut = {
        "transform": "scale(1)",
        "transition-duration": "0.15s",
        "border": "none"
    };

    let color_1 = document.getElementById("color1");
    let color_2 = document.getElementById("color2");
    let color_3 = document.getElementById("color3");
    let color_4 = document.getElementById("color4");
    let color_5 = document.getElementById("color5");

    if (unhoveredColor == "color1") {
        Object.assign(color_1.style, hoverOut);
    } else if (unhoveredColor == "color2") {
        Object.assign(color_2.style, hoverOut);
    } else if (unhoveredColor == "color3") {
        Object.assign(color_3.style, hoverOut);
    } else if (unhoveredColor == "color4") {
        Object.assign(color_4.style, hoverOut);
    } else if (unhoveredColor == "color5") {
        Object.assign(color_5.style, hoverOut);
    }
}

function putInInput(id, color) {
    document.getElementById("selectCategory").innerHTML = document.getElementById(id).innerHTML;
    document.getElementById("categoryDiv").style.display = "none";
    document.getElementById("rotateTriangle").style.transform = "rotate(180deg)";
    selectedColor = color;
}

function close_addTask() {
    document.getElementById("greyBackground").style.display = "none";
    document.getElementById("addTask").innerHTML = "";
    setPrio = undefined;
    subtaskArray = [];
    chooseColor = false;
    selectedColor = undefined;
}

function randColor(){
    let backgroundColors = ["color1", "color2", "color3", "color4", "color5"];
    let chosenColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    return chosenColor
}

function openAssignedTo() {
    if (document.getElementById("assignedToDiv").innerHTML == "") {
        document.getElementById("taskInfo").classList.add("showScroll");
        document.getElementById("rotateTriangle2").style.transform = "rotate(180deg)";
        document.getElementById("assignedToDiv").innerHTML = /*html*/ `
        <div>
            <p id="assigned_0">Wladimir Putin</p>
            <input id="assign_0" type="checkbox">
        </div>
        <div>
            <p id="assigned_1">Recep Erdogan</p>
            <input id="assign_1" type="checkbox">
        </div>
        <div>
            <p id="assigned_2">Olaf Scholz</p>
            <input id="assign_2" type="checkbox">
        </div>
        `;
    } else if (!document.getElementById("assignedToDiv").innerHTML == "") {
        document.getElementById("assignedToDiv").innerHTML = "";
        document.getElementById("rotateTriangle2").style.transform = "rotate(360deg)";
    }
}

function render_taskInfo(index) {
    const task = boardContent[index];

    document.getElementById("greyBackground").style.display = "flex";
    document.getElementById("taskInfo").style.visibility = "visible";
    document.getElementById("addTask").style.visibility = "hidden";
    const taskInfoElement = document.getElementById('taskInfo');
    taskInfoElement.style.visibility = "visible";
    taskInfoElement.innerHTML = /*html*/ `
        <img class="closeTask" src="img/board/closeIcon.png" alt="Close-Icon" onclick="closeTaskInfo(${index})">
        <p id="taskDescription" class="renderCategory category ${task.color}">${task.category}</p>
        <h2 class="taskTitle">${task.title}</h2>
        <p class="taskDescription">${task.description}</p>
        <p class="taskDate">Due date:<span class="dateInfo">${task.date}</span></p>
        <br>
        <p class="taskPrio">Priority:</p>
        <div class="btnImg">
            <button class="prioInfo ${colorPrioBtn(index)}">${task.prioWord}
                <img class="invertPrioIcon" src="${showPrioSymbol(index)}" alt="Priority-Symbol">
            </button>
        </div>
        <div id="subtasks"></div>
        <p class="taskAssignedTo">Assigned to:</p>
        <div id="assignees"></div>
        <img class="editBtn" src="img/board/info_editBtn.png" alt="Edit-Icon" onclick="render_editInfo(${index})">
    `;

    render_subTasks(index);

    for (let i = 0; i < boardContent[index].names.length; i++) {  
        const name =  boardContent[index].names[i];
        const initials = name.split(' ').map(name => name.charAt(0)).join(''); 
        document.getElementById('assignees').innerHTML += /*html*/ `
        <div>
            <p class="initial" style='background-color:${namesColor[name]}; width: 3.5rem; height: 3.5rem; font-size: 1.2rem'>${initials}</p>
            <p class="names">${boardContent[index].names[i]}</p>
        </div>
        `;        
    }
}

function closeTaskInfo(index) {
    confirmSubtaskChanges(index);
    document.getElementById("greyBackground").style.display = "none";
    document.getElementById("taskInfo").style.visibility = "hidden";
    document.getElementById("taskInfo").style.visibility = "hidden";
    saveBoardContent();
    render();
}

function closeIconHoveredColor() {
    document.getElementById("closeIconClear").style.filter = "invert(59%) sepia(97%) saturate(1585%) hue-rotate(165deg) brightness(93%) contrast(90%)";
}

function closeIconColorBack() {
    document.getElementById("closeIconClear").style.filter = "none";
}

function clearAllTask() {
    setPrio = undefined;
    subtaskArray = [];
    chooseColor = false;
    selectedColor = undefined;
    render_addTask();
}

function colorPrioBtn(i) {
    if (boardContent[i].prioWord == "Urgent") {
        return "urgentColor"
    } else if (boardContent[i].prioWord == "Medium") {
        return "mediumColor"
    } else if (boardContent[i].prioWord == "Low") {
        return "lowColor"
    }
}

function render_editInfo(index) {
    confirmSubtaskChanges(index);

    document.getElementById("taskInfo").innerHTML = "";
    document.getElementById("taskInfo").innerHTML = /*html*/ `
    <img class="closeTask" src="img/board/closeIcon.png" alt="Close-Icon" onclick="closeTaskInfo(${index})">
    <p class="infoSection">Title</p>
    <input id="titleInput" type="text">
    <p class="infoSection">Description</p>
    <textarea id="descriptionArea" cols="30" rows="10"></textarea>
    <p class="infoSection">Due date</p>
    <input id="dateInput" type="date">
    <p class="infoSection">Prio</p>
    <div class="prioDiv">
        <button id="urgent" class="prioButton urgent" onclick="pressButton('urgent')" onmouseover="upperButton('urgent')" onmouseout="lowerButton('urgent')">Urgent<img id="img_urgent" src="img/add_task/urgentSymbol.png" alt="Urgent-Symbol"></button>
        <button id="medium" class="prioButton medium" onclick="pressButton('medium')" onmouseover="upperButton('medium')" onmouseout="lowerButton('medium')">Medium<img id="img_medium" src="img/add_task/mediumSymbol.png" alt="Medium-Symbol"></button>
        <button id="low" class="prioButton low" onclick="pressButton('low')" onmouseover="upperButton('low')" onmouseout="lowerButton('low')">Low<img id="img_low" src="img/add_task/lowSymbol.png" alt="Low-Symbol"></button>
    </div>
    <p class="infoSection">Assigned to</p>
    <div class="assignedToDiv">
        <div class="inputCategoryAssignedTo" onclick="openAssignedTo()">
            <p>Select contacts to assign</p>
            <img id="rotateTriangle2" src="img/add_task/openTriangle.png" alt="Open-Symbol">
        </div>
        <div id="assignedToDiv"></div>
    </div>
    <img class="confirmBtn" src="img/board/info_checkBtn.png" alt="Confirm-Icon" onclick="confirmChanges(${index})">
    `;

    document.getElementById("titleInput").value = `${boardContent[index].title}`;
    document.getElementById("descriptionArea").value = `${boardContent[index].description}`;     

    setPrio = boardContent[index].prioWord;
    setPrio = undefined;
    pressButton(boardContent[index].prioWord.toLowerCase());
    dateFormat(index);  
}

function confirmSubtaskChanges(index) {
    if (!document.getElementById('subtasks')) {
        return
    }
    for (let i = 0; i < document.getElementById('subtasks').getElementsByTagName('input').length; i++) {
        let subtask = boardContent[index].subtasks[i];        
        if (document.getElementById(`checkSubtask_${i}`).checked == true) {
            subtask[Object.keys(subtask)[0]] = true;
        } else if (document.getElementById(`checkSubtask_${i}`).checked == false){
            subtask[Object.keys(subtask)[0]] = false;
        }
    }    
}

function confirmChanges(index) {
    boardContent[index].title = document.getElementById('titleInput').value;
    boardContent[index].description = document.getElementById('descriptionArea').value;
    boardContent[index].date = dateFormatBack();
    boardContent[index].prioWord = capitalizeFirstLetter(setPrio);
    setPrio = undefined;

    saveBoardContent();
    render_taskInfo(index)
}

function dateFormatBack() {
    const dateInput = document.getElementById("dateInput");
    const dateParts = dateInput.value.split("-");
    const newDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
    return newDate;
}

function dateFormat(index) {
    const dateInput = document.getElementById("dateInput");
    const dateParts = boardContent[index].date.split(".");
    const newDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    dateInput.value = newDate;
}

function showPrio(prio) {
    if (prio == "urgent") {
        Object.assign(urgent.style, urgentCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol_white.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol.png";
    } else if (prio == "medium") {
        Object.assign(medium.style, mediumCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol_white.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol.png";
    } else if (prio == "low") {
        Object.assign(low.style, lowCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol_white.png";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function saveBoardContent() {
    localStorage.setItem("boardContent", JSON.stringify(boardContent));
}

function loadBoardContent() {
    boardContent = localStorage.getItem("boardContent");
    boardContent = JSON.parse(boardContent)
}

function render_subTasks(index) {
    document.getElementById("subtasks").innerHTML = /*html*/ `
    <p class="subtask">Subtasks:</p>
    <div id="subtask" class="subtaskDiv"></div>
    `;

    for (let i = 0; i < boardContent[index].subtasks.length; i++) {
        document.getElementById("subtask").innerHTML += /*html*/ `
        <div id="subtaskContent_${i}" class="finishedSubtask">
            <input id='checkSubtask_${i}' type="checkbox">
            <p>${Object.keys(boardContent[index].subtasks[i])}</p>
            <img onclick="deleteSubtaskInTaskInfo(${index}, ${i})" src="img/add_task/closeSymbol.png" alt="Close-Icon">
        </div>
        `;
    }
    for (let i = 0; i < boardContent[index].subtasks.length; i++) {
        if (Object.values(boardContent[index].subtasks[i])[0]) {
            document.getElementById(`checkSubtask_${i}`).checked = true;
        }
    }

    for (let i = 0; i < boardContent.length; i++) {
        if (document.getElementById("subtask").innerHTML == "") {
            document.getElementById("subtasks").style.display = "none";
            document.querySelector(".taskAssignedTo").style.marginTop = "0";
        }
    }
}

function deleteSubtaskInTaskInfo(boardContentIndex, arrayIndex) {
    document.getElementById(`subtaskContent_${arrayIndex}`).remove();
    boardContent[boardContentIndex].subtasks.splice(arrayIndex,1);

}

function deleteTask(index) {
    const taskElement = document.getElementById(`task${index}`);
    taskElement.remove();
    boardContent.splice(index, 1);
    saveBoardContent();
  }
  