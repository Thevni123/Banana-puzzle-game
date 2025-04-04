//Code was written with the help of chat-gpt
//https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

function checkSession(){
    const user = sessionStorage.getItem("user");
    if(!user){
        alert("You must log in first!");
        window.location.href="login.html";
    }
}

function startGame() {
    checkSession();
    window.location.href = 'levelpg.html';
    alert(`Choose your level....!!`);
}

function userProfile() {
    checkSession();
    window.location.href = 'profile.html';
    alert(`Open User Profile...!!`);
}

function leaderBoard() {
    checkSession();
    window.location.href = 'leaderboard.html';
    alert(`Open Leaderboard...!!`);
}

//https://stackoverflow.com/questions/52697055/how-to-use-sessionstorage-for-a-webpage-for-a-login-user
function leaveGame(){
    if(confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem("user");
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", checkSession);