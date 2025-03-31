function startGame(level){
    alert(`Starting Level ${level}!`);
    window.location.href = `gamepg.html?level=${level}`;
}

document.getElementById("backToMenu").addEventListener("click",() => {
    window.location.href = "startpg.html";
});