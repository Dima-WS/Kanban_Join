"use strict"

let boardContent = [
    {
        "color": "color1",
        "heading": "ToDo",
        "category": "Design",
        "title": "Website redesign",
        "description": "Modify the contents of the main website...",
        "subtasks": [],
        "prioWord": "Urgent",
        "names": ["Wladimir Putin", "Recep Erdogan"],
        "date": "27.03.2023"
    },

    {
        "color": "color2",
        "heading": "InProgress",
        "category": "Sales",
        "title": "Call potential clients",
        "description": "Make the product presentation to prospective buyers",
        "subtasks": [],
        "prioWord": "Low",
        "names": ["Olaf Scholz"],
        "date": "29.03.2023"
    },

    {
        "color": "color3",
        "heading": "AwaitingFeedback",
        "category": "Backoffice",
        "title": "Accounting invoices",
        "description": "Write open invoices for customer",
        "subtasks": [{"Send invoices to customer": false}, {"Offer customer a installment plan": true}],
        "prioWord": "Medium",
        "names": ["Wladimir Putin", "Recep Erdogan", "Olaf Scholz"],
        "date": "24.03.2023"
    },

    {
        "color": "color4",
        "heading": "Done",
        "category": "Marketing",
        "title": "Social media strategy",
        "description": "Develop an ad campaign for brand positioning",
        "subtasks": [],
        "prioWord": "Urgent",
        "names": ["Wladimir Putin", "Olaf Scholz"],
        "date": "26.03.2023"
    }
]


let subtaskArray = [];
let setPrio;
let chooseColor;
let selectedColor;

function render() {
    loadBoardContent();

    document.getElementById("content").innerHTML =  /*html*/ `
    <h6 class="responsiveMobile">Kanban Project Management Tool</h6>
    <h1>Add Task</h1>
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
            <input id="date" type="date" placeholder="dd/mm/yyyy">
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
            <button class="clear" onmouseover="closeIconHoveredColor()" onmouseout="closeIconColorBack()" onclick="clearAllTask()">Clear<img id="closeIconClear" src="img/add_task/closeSymbol.png" alt="Close-Icon"></button>
            <button class="create" onclick="createTask()">Create Task<img src="img/add_task/checkmarkSymbol.png" alt="Checkmark-Icon"></button>
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
    let urgentCSS = {
        "color": "#fff",
        "background-color": "#ff3d00",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };

    let mediumCSS = {
        "color": "#fff",
        "background-color": "#ffa800",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };

    let lowCSS = {
        "color": "#fff",
        "background-color": "#7ae229",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };
    
    let CSS_before = {
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

function deleteFinishedSubtask() {
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
        <!-- <p class="grey" onclick="colorChoice()">New category</p> -->
        <p id="backoffice" class="turquoise" onclick="putInInput('backoffice', 'color3')">Backoffice<span class="selectColor turquoise_point"></span></p>
        <p id="design" class="orange" onclick="putInInput('design', 'color1')">Design<span class="selectColor orange_point"></span></p>
        <p id="marketing" class="blue" onclick="putInInput('marketing', 'color4')">Marketing<span class="selectColor blue_point"></span></p>
        <p id="media" class="yellow" onclick="putInInput('media', 'color5')">Media<span class="selectColor yellow_point"></span></p>
        <p id="sales" class="pink" onclick="putInInput('sales', 'color2')">Sales<span class="selectColor pink_point"></span></p>
        `;
        } else if (!document.getElementById("categoryDiv").innerHTML == "") {
            document.getElementById("categoryDiv").innerHTML = "";
            document.getElementById("rotateTriangle").style.transform = "rotate(360deg)";
        }
}

// function colorChoice() {
//     document.getElementById("categoryTitle").style.display = "none";
//     document.getElementById("categoryTitle").style.margin = "0.8rem 0 1rem 0";
//     document.getElementById("category").style.display = "none";
//     document.getElementById("colorChoice").style.display = "flex";
//     document.getElementById("createCategory").innerHTML = /*html*/ `
//     <input id="categoryInput" class="categoryText" type="text" placeholder="New category name">
//     <div class="subtaskIcons categoryIcons">
//         <img onclick="returnCategory()" class="closeIcon" src="img/add_task/closeIcon.png" alt="Close-Icon">
//         <img class="subtaskLine" src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
//         <img class="checkmarkIcon" src="img/add_task/checkmarkSymbolGrey.png" alt="Checkmark">
//     </div>
//     `;
//     document.getElementById("colorChoice").innerHTML = /*html*/ `
//     <span id="color1" onmouseover="colorFocus('color3')" onmouseout="colorUnfocus('color1')" class="green newCategory"></span>
//     <span id="color2" onmouseover="colorFocus('color1')" onmouseout="colorUnfocus('color2')" class="red newCategory"></span>
//     <span id="color3" onmouseover="colorFocus('color4')" onmouseout="colorUnfocus('color3')" class="violet newCategory"></span>
//     <span id="color4" onmouseover="colorFocus('color5')" onmouseout="colorUnfocus('color4')" class="brightBlue newCategory"></span>
//     <span id="color5" onmouseover="colorFocus('color2')" onmouseout="colorUnfocus('color5')" class="darkYellow newCategory"></span>
//     `;

//     document.getElementById("createCategory").style.display = "flex";
// }

function returnCategory() {
    document.getElementById("categoryInput").value = "";
    document.getElementById("createCategory").style.display = "none";
    document.getElementById("colorChoice").style.display = "none";
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
}

function randColor(){
    let backgroundColors = ["color1", "color2", "color3", "color4", "color5"];
    let chosenColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    return chosenColor
}

function openAssignedTo() {
    if (document.getElementById("assignedToDiv").innerHTML == "") {
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
    render();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function saveBoardContent() {
    localStorage.setItem("boardContent", JSON.stringify(boardContent));
}

function loadBoardContent() {
    localStorage.getItem("boardContent");
}

