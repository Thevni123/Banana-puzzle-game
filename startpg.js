function startGame() {
    window.location.href = 'levelpg.html';
}

function leaveGame(){
    if(confirm('Are you sure you wany to leave?')) {
        window.close();
    }
}