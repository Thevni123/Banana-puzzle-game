function startGame() {
    window.location.href = 'levelpg.html';
    alert(`Choose your level....!!`);
}

function leaveGame(){
    if(confirm('Are you sure you wany to leave?')) {
        window.close();
    }
}