"use strict"

function renderLogin() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").innerHTML = /*html*/ `
    <img class="joinIcon" src="img/login/JoinIcon.png" alt="Join-Icon">
    <div class="signUp_div">
        <p>Not a Join user?</p>
        <button id="signUp_btn" class="signUp_btn" onmouseover="upperButtonSignUp()" onmouseout="lowerButtonSignUp()" onclick="openSignUp()">Sign up</button>
    </div>
    <div class="loginDiv">
        <h2>Log in</h2>
        <img class="horizontalLine" src="img/login/horizontalLine.png" alt="Horizontal Line">
        <input id="email_input_logIn" class="email_input" type="text" placeholder="Email" required>
        <input id="password_input_logIn" class="password_input" type="password" placeholder="Password" required>
        <p class="forgotPW">Forgot my password</p>
        <div class="buttonsDiv">
            <button id="login" class="login" onmouseover="upperButtonLogin()" onmouseout="lowerButtonLogin()" onclick="login()">Log in</button>
            <button id="guest_login" class="guest_login" onmouseover="upperButtonGuest()" onmouseout="lowerButtonGuest()" onclick="setNameToStorage('Guest')"><a id="guest_login_link" href="summary.html">Guest Log in</a></button>
        </div>
    </div>
    `;
}

function upperButtonLogin() {
    document.getElementById("login").style.backgroundColor = "#29ABE2";
    document.getElementById("login").style.boxShadow = "0 5px 5px #a2a2a2";
    document.getElementById("login").style.transform = "translateY(-5px)";
    document.getElementById("login").style.transitionDuration = "0.2s";
}

function lowerButtonLogin() {
    document.getElementById("login").style.backgroundColor = "#2A3647";
    document.getElementById("login").style.boxShadow = "none";
    document.getElementById("login").style.transform = "translateY(0)";
    document.getElementById("login").style.transitionDuration = "0.2s";
}

function upperButtonGuest() {
    document.getElementById("guest_login_link").style.color = "#29ABE2";
    document.getElementById("guest_login_link").style.transitionDuration = "0.2s";
    document.getElementById("guest_login").style.border = "1px solid #29ABE2";
    document.getElementById("guest_login").style.boxShadow = "0 5px 5px #a2a2a2";
    document.getElementById("guest_login").style.transform = "translateY(-5px)";
    document.getElementById("guest_login").style.transitionDuration = "0.2s";
}

function lowerButtonGuest() {
    document.getElementById("guest_login_link").style.color = "#2A3647";
    document.getElementById("guest_login_link").style.transitionDuration = "0.2s";
    document.getElementById("guest_login").style.border = "1px solid #2A3647";
    document.getElementById("guest_login").style.boxShadow = "none";
    document.getElementById("guest_login").style.transform = "translateY(0)";
    document.getElementById("guest_login").style.transitionDuration = "0.2s";
}

function upperButtonSignUp() {
    document.getElementById("signUp_btn").style.backgroundColor = "#29ABE2";
    document.getElementById("signUp_btn").style.boxShadow = "0 5px 5px #a2a2a2";
    document.getElementById("signUp_btn").style.transform = "translateY(-5px)";
    document.getElementById("signUp_btn").style.transitionDuration = "0.2s";
}

function lowerButtonSignUp() {
    document.getElementById("signUp_btn").style.backgroundColor = "#2A3647";
    document.getElementById("signUp_btn").style.boxShadow = "none";
    document.getElementById("signUp_btn").style.transform = "translateY(0)";
    document.getElementById("signUp_btn").style.transitionDuration = "0.2s";
}

function openSignUp() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").innerHTML = /*html*/ `
    <img class="joinIcon" src="img/login/JoinIcon.png" alt="Join-Icon">
    <div class="loginDiv">
        <img class="backArrow" src="img/login/backIcon.png" alt="Back-Arrow" onclick="goBack()">
        <h2>Sign up</h2>
        <img class="horizontalLine" src="img/login/horizontalLine.png" alt="Horizontal Line">
        <div class="inputsDiv">
            <input id="name_input_signUp" class="name_input" type="text" placeholder="Name" required>
            <input id="email_input_signUp" class="email_input" type="text" placeholder="Email" required>
            <input id="password_input_signUp" class="password_input" type="password" placeholder="Password" required>
        </div>
        <div class="buttonDiv">
            <button id="signUp_btn" class="signUp" onmouseover="upperButtonSignUp()" onmouseout="lowerButtonSignUp()" onclick="saveData()">Sign up</button>
        </div>
    </div>
    `;

    document.getElementById("name_input_signUp").style.marginBottom = "2rem";
    document.getElementById("name_input_signUp").style.minHeight = "3rem";
    document.getElementById("email_input_signUp").style.marginBottom = "2rem";
    document.getElementById("email_input_signUp").style.minHeight = "3rem";
    document.getElementById("password_input_signUp").style.marginBottom = "2rem";
    document.getElementById("password_input_signUp").style.minHeight = "3rem";
}

function goBack() {
    renderLogin();
}

function setNameToStorage(name) {
    const splitName = name.split(' ');
    sessionStorage.setItem("username", JSON.stringify(splitName));
}

function saveData() {
    let name = document.getElementById("name_input_signUp").value;
    let email = document.getElementById("email_input_signUp").value;
    let password = document.getElementById("password_input_signUp").value;

    if (name !== "" && email !== "" && password !== "") {
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        renderLogin();
    } else if (name === "" || email === "" || password === "") {
        alert("Please fill out all fields");
    }
}
  
  function login() {
    let email = document.getElementById("email_input_logIn").value;
    let password = document.getElementById("password_input_logIn").value;
  
    let savedEmail = sessionStorage.getItem("email");
    let savedPassword = sessionStorage.getItem("password");
    
    if (email === savedEmail && password === savedPassword && email !== "" && password !== "") {
      window.location.href = "summary.html";
    } else if (email === "" || password === "") {
        alert("Please fill out all fields")
    } else {
        alert("Invalid email or password");
    }
  }
  