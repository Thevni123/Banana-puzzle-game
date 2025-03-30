import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, get, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDqij1...",
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

        async function loadLeaderboard() {
            const leaderboardBody = document.getElementById("leaderboard-body");
            leaderboardBody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";
            
            try {
                const usersRef = query(ref(db, "users"), orderByChild("score"), limitToLast(10));
                const snapshot = await get(usersRef);
                
                if (snapshot.exists()) {
                    const users = [];
                    snapshot.forEach(childSnapshot => {
                        users.push({ username: childSnapshot.val().username, score: childSnapshot.val().score || 0 });
                    });
                    users.reverse();
                    
                    leaderboardBody.innerHTML = users.map((user, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${user.username}</td>
                            <td>${user.score}</td>
                        </tr>
                    `).join("");
                } else {
                    leaderboardBody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
                }
            } catch (error) {
                console.error("Error loading leaderboard:", error);
                leaderboardBody.innerHTML = "<tr><td colspan='3'>Error loading leaderboard</td></tr>";
            }
        }

        loadLeaderboard();