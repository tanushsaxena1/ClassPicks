// Predefined users (would normally be stored in a database)
let users = JSON.parse(localStorage.getItem("users")) || {
    "user1": "password123",
    "admin": "adminpass"
};
localStorage.setItem("users", JSON.stringify(users));

// Load correct page data
window.onload = function() {
    if (document.getElementById("login-container")) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (loggedInUser) {
            showBets(loggedInUser);
            loadUserBet(loggedInUser);
        }
    }
    loadScoreboard();
    updateTradeStatus();
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
        updateTradeStatus();

        // Show Lock/Unlock button if admin is logged in
        if (username === "admin") {
            document.getElementById("lock-button").style.display = "block";
        } else {
            document.getElementById("lock-button").style.display = "none";
        }
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

// Save & update bets in real time
function placeBet(type) {
    const username = sessionStorage.getItem("loggedInUser");
    if (!username) return;

    // Prevent betting if trades are locked
    if (localStorage.getItem("tradesLocked") === "true") {
        alert("Trades are locked! You cannot change your bet.");
        return;
    }

    document.getElementById("bet-over1").classList.remove("selected");
    document.getElementById("bet-under1").classList.remove("selected");
    document.getElementById(`bet-${type}`).classList.add("selected");

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
        document.getElementById(`score-${userBets[username]}`).appendChild(listItem);
    });
}

// Toggle trade lock/unlock (admin only)
function toggleTrades() {
    let isLocked = localStorage.getItem("tradesLocked") === "true";
    localStorage.setItem("tradesLocked", !isLocked);
    updateTradeStatus();
}

// Update trade status on all user screens
function updateTradeStatus() {
    let isLocked = localStorage.getItem("tradesLocked") === "true";
    let lockButton = document.getElementById("lock-button");

    if (lockButton) {
        lockButton.textContent = isLocked ? "Unlock Trades" : "Lock Trades";
    }

    let buttons = document.querySelectorAll(".bet-option");
    buttons.forEach(button => {
        button.disabled = isLocked;
        button.style.opacity = isLocked ? "0.5" : "1";
        button.style.cursor = isLocked ? "not-allowed" : "pointer";
    });
}
