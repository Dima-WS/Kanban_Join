"use strict"

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function render() {
    const name = JSON.parse(sessionStorage.getItem("username"));

    document.getElementById("content").innerHTML =  /*html*/ `
    <div class="title">
        <h1>
            <p class="heading-responsive">Kanban Project Management Tool</p>
            <span class="heading_first">
                Summary
            </span>
            <img class="hiddenVerticalLine" src="img/summary/blueVerticalLine.png" alt="Vertical Line">
            <span class="heading_second">
                Everything in a nutshell!
            </span>
            <img class="showedHorizontalLine" src="img/summary/horizontalLine-responsive.png" alt="Horizontal Line">
        </h1>
    </div>
    <div class="mainContent">
        <div class="greeting">
            <p id="timeDate"></p>
            <p id="userName">${name[0]}</p>
        </div>
        <div class="firstRow">
            <a href="board.html"><div class="boxes_1">
                <p id="taskAmount" class="quantity"></p>
                <p class="boxInfo">Tasks in<br>Board</p>
            </div></a>
            <a href="board.html"><div class="boxes_1">
                <p id="inProgressAmount" class="quantity"></p>
                <p class="boxInfo">Tasks in<br>Progress</p>
            </div></a>
            <a href="board.html"><div class="boxes_1">
                <p id="awaitingFeedback" class="quantity"></p>
                <p class="boxInfo">Awaiting<br>Feedback</p>
            </div></a>
        </div>
        <a href="board.html"><div class="secondRow">
            <div class="leftPart">
                <img class="urgentIcon" src="img/summary/urgentSymbol.png" alt="Urgent-Symbol">
                <div class="boxes_2">
                    <p id="urgentAmount" class="quantity"></p>
                    <p class="boxInfo_2">Urgent</p>
                </div>
            </div>
            <img class="greyVerticalLine" src="img/summary/greyVerticalLine.png" alt="Vertical Line">
            <div class="rightPart">
                <p id="currentDate" class="date"></p>
                <p class="boxInfo_2">Upcoming Deadline</p>
            </div>
        </div></a>
        <div class="thirdRow">
            <a href="board.html"><div class="firstBox" onmouseover="mouseoverImg_1()" onmouseout="mouseoutImg_1()">
                <div class="thirdRow_subBox">
                    <img src="img/summary/toDoSymbol.png" alt="To Do-Symbol" id="img_1">
                    <div class="toDo">
                        <p id="toDoAmount" class="quantity"></p>
                        <p class="boxInfo">To-do</p>
                    </div>
                </div>
            </div></a>
            <a href="board.html"><div class="secondBox" onmouseover="mouseoverImg_2()" onmouseout="mouseoutImg_2()">
                <div class="thirdRow_subBox">
                    <img src="img/summary/doneSymbol.png" alt="Done-Symbol" id="img_2">
                    <div class="done">
                        <p id="doneAmount" class="quantity"></p>
                        <p class="boxInfo">Done</p>
                    </div>
                </div>
            </div></a>
        </div>
    </div>
    `;
    greetingTime()
    currentDate()
    countTasks()
    getUsername()
}

/* Change symbol after hover */

function mouseoverImg_1() {
    let element = document.getElementById("img_1");
    element.src = "img/summary/toDoSymbol_2.png";
    element.style.opacity = ""
}

function mouseoutImg_1() {
    let element = document.getElementById("img_1");
    element.src = "img/summary/toDoSymbol.png";
}

function mouseoverImg_2() {
    let element = document.getElementById("img_2");
    element.src = "img/summary/doneSymbol_2.png";
}

function mouseoutImg_2() {
    let element = document.getElementById("img_2");
    element.src = "img/summary/doneSymbol.png";
}

function getSessionStorage() {
    const name = sessionStorage.getItem("username");
    return name[0]
}

/* Greeting in relationship to time */

function greetingTime() {
    const d = new Date();
    let hour = d.getHours();
    let greeting = document.getElementById("timeDate");
    console.log(hour);

    if (hour >= 3 && hour < 12) {
        greeting.innerHTML = "Good morning,";
    } else if (hour >= 12 && hour < 16) {
        greeting.innerHTML = "Hello,";
    } else if (hour >= 16 && hour < 18) {
        greeting.innerHTML = "Good afternoon,";
    } else if (hour >= 18 || hour < 3) {
        greeting.innerHTML = "Good evening,";
    }
}

function currentDate() {
    const d = new Date();
    let currentMonth = month[d.getMonth()];
    let currentDay = d.getDate();
    let currentYear = d.getFullYear();

    document.getElementById("currentDate").innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;
}

function countTasks() {
    const storedBoardContent = JSON.parse(localStorage.getItem("boardContent"));

    const tasksCount = storedBoardContent.length;
    document.getElementById("taskAmount").innerHTML = `${tasksCount}`;

    const inProgress = storedBoardContent.filter(obj => obj.heading === "InProgress").length;
    document.getElementById("inProgressAmount").innerHTML = `${inProgress}`;
    
    const awaitingFeedback = storedBoardContent.filter(obj => obj.heading === "AwaitingFeedback").length;
    document.getElementById("awaitingFeedback").innerHTML = `${awaitingFeedback}`;

    const urgent = storedBoardContent.filter(obj => obj.prioWord === "Urgent").length;
    document.getElementById("urgentAmount").innerHTML = `${urgent}`;

    const toDo = storedBoardContent.filter(obj => obj.heading === "ToDo").length;
    document.getElementById("toDoAmount").innerHTML = `${toDo}`;

    const done = storedBoardContent.filter(obj => obj.heading === "Done").length;
    document.getElementById("doneAmount").innerHTML = `${done}`;
}

function getUsername() {
    const name = sessionStorage.getItem("name").split(" ")[0];
    document.getElementById("userName").innerHTML = `${name}`;
}