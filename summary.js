"use strict"

function render() {
    document.getElementById("content").innerHTML =  /*html*/ `
    <div class="title">
        <h1>
            <span class="heading_first">
                Summary
            </span>
            <img src="img/summary/blueVerticalLine.png" alt="Vertical Line">
            <span class="heading_second">
                Everything in a nutshell!
            </span>
        </h1>
    </div>
    <div class="mainContent">
        <div class="firstRow">
            <a href="board.html"><div class="boxes_1">
                <p class="quantity">5</p>
                <p class="boxInfo">Tasks in<br>Board</p>
            </div></a>
            <a href="board.html"><div class="boxes_1">
                <p class="quantity">2</p>
                <p class="boxInfo">Tasks in<br>Progress</p>
            </div></a>
            <a href="board.html"><div class="boxes_1">
                <p class="quantity">2</p>
                <p class="boxInfo">Awaiting<br>Feedback</p>
            </div></a>
        </div>
        <a href="board.html"><div class="secondRow">
            <div class="leftPart">
                <img class="urgentIcon" src="img/summary/urgentSymbol.png" alt="Urgent-Symbol">
                <div class="boxes_2">
                    <p class="quantity">1</p>
                    <p class="boxInfo_2">Urgent</p>
                </div>
            </div>
            <img class="greyVerticalLine" src="img/summary/greyVerticalLine.png" alt="Vertical Line">
            <div class="rightPart">
                <p class="date">February 1, 2023</p>
                <p class="boxInfo_2">Upcoming Deadline</p>
            </div>
        </div></a>
        <div class="thirdRow">
            <a href="board.html"><div class="firstBox" onmouseover="mouseoverImg_1()" onmouseout="mouseoutImg_1()">
                <div class="thirdRow_subBox">
                    <img src="img/summary/toDoSymbol.png" alt="To Do-Symbol" id="img_1">
                    <div class="toDo">
                        <p class="quantity">1</p>
                        <p class="boxInfo">To-do</p>
                    </div>
                </div>
            </div></a>
            <a href="board.html"><div class="secondBox" onmouseover="mouseoverImg_2()" onmouseout="mouseoutImg_2()">
                <div class="thirdRow_subBox">
                    <img src="img/summary/doneSymbol.png" alt="Done-Symbol" id="img_2">
                    <div class="done">
                        <p class="quantity">1</p>
                        <p class="boxInfo">Done</p>
                    </div>
                </div>
            </div></a>
        </div>
    </div>
    `;
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