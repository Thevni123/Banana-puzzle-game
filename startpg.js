function startGame() {
    window.location.href = 'levelpg.html';
    alert(`Choose your level....!!`);
}

function leaveGame(){
    if(confirm('Are you sure you want to leave?')) {
        window.close();
    }
}

function userProfile() {
    window.location.href = 'profile.html';
    alert(`Open User Profile...!!`);
}

function leaderBoard() {
    window.location.href = 'leaderboard.html';
    alert(`Open Leaderboard...!!`);
}