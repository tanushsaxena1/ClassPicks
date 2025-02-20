// Check if trades are locked
function isLocked() {
    return localStorage.getItem("tradesLocked") === "true";
}

// Show betting section and admin controls
function showBets(username) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("bets-container").style.display = "block";
    document.getElementById("welcome-message").textContent = `Welcome, ${username}`;
    document.getElementById("logout-btn").style.display = "block";

    // Only show lock button for admin
    if (username === "admin") {
        document.getElementById("lock-trades-btn").style.display = "block";
    }

    // Disable bets if locked
    if (isLocked()) {
        disableBets();
    }
}

// Lock trades function
function lockTrades() {
    localStorage.setItem("tradesLocked", "true");
    disableBets();
}

// Disable bet buttons
function disableBets() {
    document.querySelectorAll(".bet-option").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
    });
}

// Override placeBet to check lock status
function placeBet(type) {
    if (isLocked()) {
        alert("Bets are locked!");
        return;
    }

    const username = sessionStorage.getItem("loggedInUser");
    if (!username) return;

    document.getElementById("bet-over1").classList.remove("selected");
    document.getElementById("bet-under1").classList.remove("selected");
    document.getElementById(`bet-${type}`).classList.add("selected");

    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    userBets[username] = type;
    localStorage.setItem("userBets", JSON.stringify(userBets));

    loadScoreboard();
}

// Ensure bets are locked on page load if needed
window.onload = function() {
    if (document.getElementById("login-container")) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (loggedInUser) {
            showBets(loggedInUser);
            loadUserBet(loggedInUser);
        }
    }
    loadScoreboard();

    if (isLocked()) {
        disableBets();
    }
};

// Load users from localStorage (or use predefined)
let users = JSON.parse(localStorage.getItem("users")) || {
    "user1": "password123",
    "admin": "adminpass"
};

// Save users back to localStorage
localStorage.setItem("users", JSON.stringify(users));

function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Attempted login:", username, password);

    if (users[username] && users[username] === password) {
        console.log("Login successful for:", username);
        sessionStorage.setItem("loggedInUser", username);
        showBets(username);
        loadUserBet(username);
        loadScoreboard();
    } else {
        console.log("Login failed for:", username);
        document.getElementById("login-error").style.display = "block";
    }
}

// Function to add a new user dynamically
function registerUser(username, password) {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User registered:", username);
}

// Example Usage (You can remove this after adding new users manually)
registerUser("tanush", "221807");


// Load correct page data
window.onload = function() {
    if (document.getElementById("login-container")) {
        // Betting page
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (loggedInUser) {
            showBets(loggedInUser);
            loadUserBet(loggedInUser);
        }
    }
    // Always load scoreboard (public page)
    loadScoreboard();
};

// Login function
function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (users[username] && users[username] === password) {
        sessionStorage.setItem("loggedInUser", username);
        showBets(username);
        loadUserBet(username);
        loadScoreboard();
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// Show betting area after login
function showBets(username) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("bets-container").style.display = "block";
    document.getElementById("welcome-message").textContent = Welcome, ${username};
    document.getElementById("logout-btn").style.display = "block";
}

// Logout function
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    location.reload();
}

// Save & update bets in real time
function placeBet(type) {
    const username = sessionStorage.getItem("loggedInUser");
    if (!username) return;

    document.getElementById("bet-over1").classList.remove("selected");
    document.getElementById("bet-under1").classList.remove("selected");
    document.getElementById(bet-${type}).classList.add("selected");

    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    userBets[username] = type;
    localStorage.setItem("userBets", JSON.stringify(userBets));

    loadScoreboard();
}

// Load and update scoreboard instantly
function loadScoreboard() {
    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    document.getElementById("score-under1").innerHTML = "";
    document.getElementById("score-over1").innerHTML = "";

    Object.keys(userBets).forEach(username => {
        let listItem = document.createElement("li");
        listItem.textContent = username;
        document.getElementById(score-${userBets[username]}).appendChild(listItem);
    });
}
