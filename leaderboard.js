import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDqij1SpGmliK3dHvQfcS06G4v3p6LOIZI",
    authDomain: "bananagame-a928d.firebaseapp.com",
    databaseURL: "https://bananagame-a928d-default-rtdb.firebaseio.com",
    projectId: "bananagame-a928d",
    storageBucket: "bananagame-a928d.firebasestorage.app",
    messagingSenderId: "789797675924",
    appId: "1:789797675924:web:efd5056f7373888500a581",
    measurementId: "G-FVL7B019DY"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const leaderboardBody = document.getElementById("leaderboard-body");

function updateLeaderboard(){
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        if(!users) {
            leaderboardBody.innerHTML = "<tr><td colspan = '3'>No data available</td></tr>";
            return;
        }

        const sortedUsers = Object.entries(users)
        .map(([uid,users]) => ({
            username: users.username || "Anonymous",
            score: users.score || 0,
        }))

        .sort((a,b) => b.score - a.score);

        leaderboardBody.innerHTML = "";
        sortedUsers.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.score}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    });
}

updateLeaderboard();

document.getElementById("backToMenu").addEventListener("click", () => {
    window.location.href = "startpg.html";
});

document.getElementById("changelevel").addEventListener("click", () => {
    window.location.href = "levelpg.html";
});