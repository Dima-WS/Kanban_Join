"use strict"

function render() {
    document.getElementById("content").innerHTML = /*html*/ `
    <div class="heading">
        <h1>Help</h1>
        <img src="img/about_join/arrowLeft.png" alt="Left arrow" onclick="previousPage()">
    </div>
    <div class="mainContent">
        <h2>What is Join?</h2>
        <p class="joinDescription">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam 
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus 
            est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd 
            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <h2>How to use it</h2>
        <div>
            <div class="column">
                <div class="number">1.</div>
                <div>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
                    takimata sanctus est Lorem ipsum dolor sit amet.
                </div>
            </div>
            <div class="column">
                <div class="number">2.</div>
                <div>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam erat, sed diam voluptua.
                </div>
            </div>
            <div class="column">
                <div class="number">3.</div>
                <div>
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
                    ipsum dolor sit amet.
                </div>
            </div>
        </div>
    </div>
    `;
}

function previousPage() {
    history.back();
}