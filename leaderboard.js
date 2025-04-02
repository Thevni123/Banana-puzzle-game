import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDx9rDw-XrAsA7Elt9BKcU0DdV_SJE-CI0",
    authDomain: "bananamathgame-de86d.firebaseapp.com",
    databaseURL: "https://bananamathgame-de86d-default-rtdb.firebaseio.com/",
    projectId: "bananamathgame-de86d",
    storageBucket: "bananamathgame-de86d.firebasestorage.app",
    messagingSenderId: "875972546489",
    appId: "1:875972546489:web:f7c5adc6aa281126017068",
    measurementId: "G-HTTPFDPK2X"
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