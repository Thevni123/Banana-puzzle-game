import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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
  const provider = new GoogleAuthProvider();
  const db = getDatabase(app);

const formTitle = document.getElementById("title-form");
const authForm = document.getElementById("auth-form");
const toggleBtn = document.getElementById("toggle-btn");
const submitBtn = document.getElementById("btn-submit");
const usernameField = document.getElementById("username");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const googleLoginBtn = document.getElementById("login-google");

let isSignup = false;

toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isSignup = !isSignup;
    formTitle.textContent = isSignup ? "Sign Up" : "Login";
    submitBtn.textContent = isSignup ? "Sign Up" : "Login";
    toggleBtn.textContent = isSignup ? "Already have an account? Login" : "Don't have an account? Sign up";
    usernameField.style.display = isSignup ? "block" : "none";
});

authForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameField.value.trim();
    const email = emailField.value.trim();
    const password = passwordField.value.trim();

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try{

        let userCredential;

        if(isSignup){
            userCredential = await createUserWithEmailAndPassword (auth, email, password);
            const user = userCredential.user;

            await set(ref(db, 'users/' + user.uid), {
                username: username || "Anonymous",
                email: email,
                password: password
            });
            
            alert("Sign up successful. Please login");
            isSignup = false;
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            toggleBtn.textContent = "Don't have an account? Sign up";
            usernameField.style.display = "none";
            return;

        }else{
            userCredential = await signInWithEmailAndPassword(auth,email,password);
            alert("Login Successful..!!");
            sessionStorage.setItem("user",JSON.stringify(userCredential.user));
            window.location.href = "startpg.html";
        }

    } catch (error) {
        alert("Error: " + error.message);
        console.error("Authentication Error: ", error);
    }
});

googleLoginBtn.addEventListener("click", async () => {
    try{
        const result = await signInWithPopup(auth,provider);
        const user = result.user;

        await set(ref(db, 'user/' + user.uid),{
            username: user.displayName || "Google User",
            email: user.email
        });

        alert("Google login successful..!!");
        console.log("User log in google: ",user);

        sessionStorage.setItem("user", JSON.stringify(user));

        window.location.href = "startpg.html";

    }catch (error){
        alert("Google login error: "+error.message);
        console.error("Google login error: ",error);
    }
});

onAuthStateChanged(auth, (user) => {
    if(user){
        console.log("User is already logged in:", user.email);
        sessionStorage.setItem("user", JSON.stringify(user));
    }
});