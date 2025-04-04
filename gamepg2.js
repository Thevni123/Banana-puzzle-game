//Code was written with the help of chat-gpt
//https://firebase.google.com/docs/web/setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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

let correctSolution = null;
let score = 0;
let timeLeft = 20;
let timer;
let questionCount = 1;
const maxQuestions = 5;
let monkeyJumpStep = 0;

document.addEventListener("DOMContentLoaded", function () {
    fetchPuzzle();

    document.getElementById("checkButton").addEventListener("click", checkAnswer);
    document.getElementById("nextButton").addEventListener("click",nextQuestion);

    const newGameButton = document.getElementById("newGameButton");
    const changeLevelButton = document.getElementById("changeLevelButton");

    if (newGameButton) {
        newGameButton.addEventListener("click", resetGame);
    }

    if(changeLevelButton){
        changeLevelButton.addEventListener("click", changeLevel);
    }

    document.getElementById("backButton").addEventListener("click", function () {
        window.location.href = "levelpg.html";
    });
});

function startTimer(){
    clearInterval(timer);
    timeLeft = 20;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0){
            clearInterval(timer);
            gameOver("⏰ Time's up! Try again.");
        }
    }, 1000);
}

function gameOver(message) {
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "block";
    document.getElementById("gameOverMessage").textContent = message;
}

function resetGame(){
    score = 0;
    questionCount = 1;
    monkeyJumpStep = 0;

    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("questionCount").textContent = `Question: ${questionCount} / ${maxQuestions}`;
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("gameOverScreen").style.display = "none";

    let monkey = document.getElementById("monkey");
    monkey.style.bottom = "0px";
    monkey.style.left = "0px";

    fetchPuzzle();
}

function changeLevel(){
    alert("Changing Level...");
    window.location.href = "levelpg.html";
}

function fetchPuzzle(){
    if(questionCount > maxQuestions) {
        gameOver(`🎉 You compleate the game! Your final score: ${score}`);
        return;
    }
////https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
    const apiUrl = "https://marcconrad.com/uob/banana/api.php";
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if(data && data.question && (data.solution !== undefined)){
            document.getElementById("puzzleImage").src = data.question;
            correctSolution = data.solution;
            document.getElementById("feedback").textContent = "";
            document.getElementById("answerInput").value = "";
            document.getElementById("nextButton").style.display = "none";
            document.getElementById("questionCount").textContent = `Question: ${questionCount} / ${maxQuestions}`;
            startTimer();
        } else {
            document.getElementById("feedback").textContent = "Invalid puzzle data received.";
        }
    })
    .catch(error => {
        console.error("Error fetching puzzle:", error);
        document.getElementById("feedback").textContent = "Failed to load puzzle.";
    });
}

function checkAnswer() {
    const user = auth.currentUser;
    if (!user) {
        alert("You need to be logged in to save your score.");
        return;
    }

    const userRef = ref(db, 'users/' + user.uid);

    const userAnswer = parseInt(document.getElementById("answerInput").value, 10);
    const feedbackEl = document.getElementById("feedback");

    if (isNaN(userAnswer)) {
        feedbackEl.textContent = "Please enter a valid number!";
        feedbackEl.style.color = "red";
        return;
    }

    let monkey = document.getElementById("monkey");

    if (userAnswer === correctSolution) {
        feedbackEl.textContent = "✅ Correct! Click 'Next Question'";
        feedbackEl.style.color = "darkgreen";
        document.getElementById("nextButton").style.display = "inline";
        clearInterval(timer);
        score += 20;
        document.getElementById("score").textContent = `Score: ${score}`;

        get(userRef)
            .then((snapshot) => {
                let previousScore = 0;
                if (snapshot.exists() && snapshot.val().score !== undefined) {
                    previousScore = snapshot.val().score; 
                }

                let totalScore = previousScore + 20; 

                return update(userRef, { score: totalScore });
            })
            .then(() => console.log("Score updated successfully"))
            .catch((error) => console.error("Error updating score:", error));

        monkeyJumpStep++;

        if (monkeyJumpStep <= 5) {
            monkey.style.bottom = `${monkeyJumpStep * 20}px`;
            monkey.style.left = `${monkeyJumpStep * 15}%`;
        }

        if (monkeyJumpStep === 5) {
            setTimeout(() => {
                feedbackEl.textContent = "🎉 Monkey reached the bananas! Well done!";
            }, 500);
        }
    } else {
        feedbackEl.textContent = "❌ Wrong answer!";
        feedbackEl.style.color = "red";
        monkey.style.bottom = "0px";
        monkeyJumpStep = 0;
        gameOver("❌ Incorrect! Try again next time.");
    }
}

function nextQuestion(){
    questionCount++;
    fetchPuzzle();
}

onAuthStateChanged(auth, (user) => {
    if(user){
        const userRef = ref(db, 'users/' +user.uid);
        get(userRef).then((snapshot) => {
            if(snapshot.exists()){
                document.getElementById("userNameDisplay").textContent = "Player: " + snapshot.val().username;
            } else{
                document.getElementById("UserNameDisplay").textContent = "Player: Anonymous";
            }
        });

        }else{
            window.location.href = "login.html";
        }
    });