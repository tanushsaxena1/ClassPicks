// Predefined users (in a real app, this would be a database)
const users = {
    "user1": "password123",
    "admin": "adminpass"
};

// Load user session
window.onload = function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showBets(loggedInUser);
        loadUserBet(loggedInUser);
    }
};

// Handle login
function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (users[username] && users[username] === password) {
        sessionStorage.setItem("loggedInUser", username);
        showBets(username);
        loadUserBet(username);
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// Display betting area
function showBets(username) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("bets-container").style.display = "block";
    document.getElementById("welcome-message").textContent = `Welcome, ${username}`;
    document.getElementById("logout-btn").style.display = "block";
}

// Handle logout
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    location.reload();
}

// Save and load individual bets
function placeBet(type) {
    const username = sessionStorage.getItem("loggedInUser");
    if (!username) return;

    // Remove selection from both buttons
    document.getElementById("bet-over1").classList.remove("selected");
    document.getElementById("bet-under1").classList.remove("selected");

    // Highlight the selected bet
    document.getElementById(`bet-${type}`).classList.add("selected");

    // Save bet in local storage
    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    userBets[username] = type;  // Store only for logged-in user
    localStorage.setItem("userBets", JSON.stringify(userBets));
}

// Load user-specific bet on login
function loadUserBet(username) {
    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    let betType = userBets[username];

    if (betType) {
        document.getElementById(`bet-${betType}`).classList.add("selected");
    }
}


