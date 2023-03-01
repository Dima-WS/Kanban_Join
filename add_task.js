"use strict"

let colors = {
    "color1": "#1fd7c1", 
    "color2": "#ff8a00",
    "color3": "#0038ff",
    "color4": "#ffc701",
    "color5": "#fc71ff",
    "color6": "#169b16",
    "color7": "#f52424",
    "color8": "#d63aee",
    "color9": "#5ec389",
    "color10": "#f1f106"
}

function render() {
    document.getElementById("content").innerHTML =  /*html*/ `
    <h1>Add Task</h1>
    <div class="mainContent">
        <div class="leftPart">
            <p>Title</p>
            <input type="text" placeholder="Enter a title">
            <p>Description</p>
            <textarea cols="30" rows="10" placeholder="Enter a description"></textarea>
            <p>Category</p>
            <div id="category" class="categoryDiv" onclick="openCategory()">
                <div id="categoryTitle" class="inputCategoryAssignedTo">
                    <p>Select task category</p>
                    <img id="rotateTriangle" src="img/add_task/openTriangle.png" alt="Open-Symbol">
                </div>
                <div id="categoryDiv"></div>
            </div>
            <div id="createCategory"></div>
            <div id="colorChoice"></div>
            <p>Assigned to</p>
            <div class="assignedToDiv">
                <div class="inputCategoryAssignedTo">
                    <p>Select contacts to assign</p>
                    <img src="img/add_task/openTriangle.png" alt="Open-Symbol">
                </div>
            </div>
        </div>
        <img src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
        <div>
    </div>
        <div class="rightPart">
            <p>Due date</p>
            <input class="calendar" type="text" placeholder="dd/mm/yyyy">
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
    </div>
    `;
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
    subtaskInput();
}

function createSubtask() {
    let inputValue = document.getElementById("subtaskInput").value;
    document.getElementById("addedSubtask").innerHTML = /*html*/ `
    <div id="subtaskContent" class="finishedSubtask">
        <input type="checkbox">
        <p>${inputValue}</p>
        <img onclick="deleteFinishedSubtask()" src="img/add_task/closeSymbol.png" alt="Close-Icon">
    </div>
    `;
    document.getElementById("subtaskInput").value = "";
    subtaskInput();
}

function deleteFinishedSubtask() {
    document.getElementById("subtaskContent").innerHTML = "";
}

function openCategory() {
    document.getElementById("categoryTitle").style.paddingTop = "0.8rem";
    document.getElementById("categoryTitle").style.paddingBottom = "0.8rem";
    document.getElementById("rotateTriangle").style.rotate = "180deg";
    document.getElementById("categoryDiv").innerHTML = /*html*/ `
    <p class="grey" onclick="colorChoice()">New category</p>
    <p id="backoffice" class="turquoise" onclick="putInInput()">Backoffice<span class="selectColor turquoise_point"></span></p>
    <p id="design" class="orange" onclick="putInInput()">Design<span class="selectColor orange_point"></span></p>
    <p id="marketing" class="blue" onclick="putInInput()">Marketing<span class="selectColor blue_point"></span></p>
    <p id="media" class="yellow" onclick="putInInput()">Media<span class="selectColor yellow_point"></span></p>
    <p id="sales" class="pink" onclick="putInInput()">Sales<span class="selectColor pink_point"></span></p>
    `;
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
    <span id="color1" onmouseover="colorFocus('color1')" onmouseout="colorUnfocus('color1')" class="green newCategory"></span>
    <span id="color2" onmouseover="colorFocus('color2')" onmouseout="colorUnfocus('color2')" class="red newCategory"></span>
    <span id="color3" onmouseover="colorFocus('color3')" onmouseout="colorUnfocus('color3')" class="violet newCategory"></span>
    <span id="color4" onmouseover="colorFocus('color4')" onmouseout="colorUnfocus('color4')" class="brightBlue newCategory"></span>
    <span id="color5" onmouseover="colorFocus('color5')" onmouseout="colorUnfocus('color5')" class="darkYellow newCategory"></span>
    `;
}

function returnCategory() {
    document.getElementById("categoryInput").value = "";
    document.getElementById("createCategory").style.display = "none";
    document.getElementById("colorChoice").style.display = "none";
    render();
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

function putInInput() {
    let taskName = document.getElementById("backoffice");
    // let taskChoice = document.getElementById("backoffice");

    // colorChoice();
    categories.push(taskName.innerHTML);
}