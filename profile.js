import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase(app);

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userScore = document.getElementById("user-score");
const backMenuBtn = document.getElementById("back-menu-btn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                userName.textContent = userData.username || "Unknown";
                userEmail.textContent = userData.email || "No email";
                
                animateScore(parseInt(userData.score) || 0);
            } else {
                userName.textContent = "Anonymous";
                userEmail.textContent = "No email";
                animateScore(0);
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    } else {
        window.location.href = "login.html";
    }
});

function animateScore(finalScore) {
    let currentScore = 0;
    userScore.textContent = currentScore;

    const interval = setInterval(() => {
        if (currentScore < finalScore) {
            currentScore++;
            userScore.textContent = currentScore;
        } else {
            clearInterval(interval);
        }
    }, 1);
}

backMenuBtn.addEventListener("click", () => {
    window.location.href = "startpg.html";
});
