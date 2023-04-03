"use strict"

function showLogOut() {
    const logOut = document.getElementById("logOut");
    console.log(logOut.style.display);

    if (logOut.style.display == "none") {
        logOut.style.display = "flex";
    } else if (logOut.style.display != "none") {
        logOut.style.display = "none";
    }
}

function backToLogin() {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");

    window.location.href = "login.html";
}