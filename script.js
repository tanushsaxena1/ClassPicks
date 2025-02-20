// Predefined users (would be stored in a real database)
const users = {
    "user1": "password123",
    "admin": "adminpass"
};

// Check if a user is logged in when the page loads
window.onload = function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showBets(loggedInUser);
        loadUserBet(loggedInUser);
    }
};

// Login function
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

// Show betting area after login
function showBets(username) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("bets-container").style.display = "block";
    document.getElementById("welcome-message").textContent = `Welcome, ${username}`;
    document.getElementById("logout-btn").style.display = "block";
}

// Logout function
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    location.reload();
}

// Save & load bets per user
function placeBet(type) {
    const username = sessionStorage.getItem("loggedInUser");
    if (!username) return;

    // Reset buttons
    document.getElementById("bet-over1").classList.remove("selected");
    document.getElementById("bet-under1").classList.remove("selected");

    // Highlight the selected bet
    document.getElementById(`bet-${type}`).classList.add("selected");

    // Store bet in local storage per user
    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    userBets[username] = type;
    localStorage.setItem("userBets", JSON.stringify(userBets));
}

// Load user's previous bet
function loadUserBet(username) {
    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    let betType = userBets[username];

    if (betType) {
        document.getElementById(`bet-${betType}`).classList.add("selected");
    }
}

