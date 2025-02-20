// Predefined users (would normally be stored in a database)
const users = {
    "user1": "password123",
    "admin": "adminpass",
    "tanush": "221807"
};

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
