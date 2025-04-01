function checkSession(){
    const user = sessionStorage.getItem("user");
    if(!user){
        alert("You must log in first!");
        window.location.href="login.html";
    }
}

function level1(){
    alert("Starting Level 1");
    window.location.href = "gamepg.html";
}

function level2(){
    alert("Starting Level 2");
    window.location.href = "gamepg2.html";
}

function level3(){
    alert("Starting Level 3");
    window.location.href = "gamepg3.html";
}

document.getElementById("backToMenu").addEventListener("click",() => {
    window.location.href = "startpg.html";
});

document.addEventListener("DOMContentLoaded", checkSession);