// Predefined users (normally stored in a database)
const users = {
    "user1": "password123",
    "admin": "adminpass"
};

// Check if a user is logged in
window.onload = function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showBets(loggedInUser);
    }
};

function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (users[username] && users[username] === password) {
        sessionStorage.setItem("loggedInUser", username);
        showBets(username);
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

function showBets(username) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("bets-container").style.display = "block";
    document.getElementById("welcome-message").textContent = `Welcome, ${username}`;
    document.getElementById("logout-btn").style.display = "block";
}

function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    location.reload();
}

