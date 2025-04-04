//Code was written with the help of chat-gpt
//https://stackoverflow.com/questions/70223314/how-can-i-save-cookies-for-dark-mode-and-light-mode-toggling
//https://firebase.google.com/docs/web/setup

function setThemeCookie(theme) {
    document.cookie = `theme=${theme};path=/;max-age=31536000`; 
}

function getThemeFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'theme') {
            return value;
        }
    }
    return 'light';
}

function applyTheme(theme) {
    const themeToggleButton = document.getElementById("theme-toggle-btn");
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeToggleButton.textContent = "Switch to Light Mode"; 
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        themeToggleButton.textContent = "Switch to Dark Mode"; 
    }
}

document.getElementById("theme-toggle-btn").addEventListener("click", () => {
    const currentTheme = getThemeFromCookie();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setThemeCookie(newTheme);
    applyTheme(newTheme);
});

window.onload = () => {
    const theme = getThemeFromCookie();
    applyTheme(theme);
};


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase(app);

//https://stackoverflow.com/questions/74721935/display-user-profile-information-from-firebase-real-time-database
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
