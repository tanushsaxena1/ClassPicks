// Load users from localStorage (or predefined)
let users = JSON.parse(localStorage.getItem("users")) || {
    "user1": "password123",
    "admin": "adminpass"
};

// Save users back to localStorage
localStorage.setItem("users", JSON.stringify(users));

// Login function
function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Attempted login:", username, password);

    if (users[username] && users[username] === password) {
        console.log("Login successful for:", username);
        sessionStorage.setItem("loggedInUser", username);
        document.getElementById("login-error").style.display = "none";

        showBets(username);
        loadUserBet(username);
        loadScoreboard();
    } else {
        console.log("Login failed for:", username);
        document.getElementById("login-error").style.display = "block";
    }
}

// Show betting section & lock button for admin
function showBets(username) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("bets-container").style.display = "block";
    document.getElementById("welcome-message").textContent = `Welcome, ${username}`;
    document.getElementById("logout-btn").style.display = "block";

    const lockTradesBtn = document.getElementById("lock-trades-btn");
    const unlockTradesBtn = document.getElementById("unlock-trades-btn");
    const resetBetsBtn = document.getElementById("reset-bets-btn");
    const betBox = document.querySelector(".bet-box");

    if (username === "admin") {
        lockTradesBtn.style.display = "block";
        unlockTradesBtn.style.display = "block";
        resetBetsBtn.style.display = "block"; // Show Reset Bets button for admin
        betBox.style.display = "none"; // Hide betting box for admin
    } else {
        lockTradesBtn.style.display = "none";
        unlockTradesBtn.style.display = "none";
        resetBetsBtn.style.display = "none";
        betBox.style.display = "block"; // Show betting for normal users
    }

    if (isLocked()) {
        disableBets();
    }
}



// Unlcock trades feature
function unlockTrades() {
    if (sessionStorage.getItem("loggedInUser") !== "admin") {
        alert("Only admin can unlock trades!");
        return;
    }
    localStorage.setItem("tradesLocked", "false");
    enableBets();
}

// Enable bet buttons when unlocked
function enableBets() {
    document.querySelectorAll(".bet-option").forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    });
}

// Logout function
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    location.reload();
}

// Check if trades are locked
function isLocked() {
    return localStorage.getItem("tradesLocked") === "true";
}

// Lock trades function (Only Admin)
function lockTrades() {
    if (sessionStorage.getItem("loggedInUser") !== "admin") {
        alert("Only admin can lock trades!");
        return;
    }
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

// Place bet (disabled if trades locked)
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

// On Page Load: Check session & Lock Status
window.onload = function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (loggedInUser) {
        showBets(loggedInUser);
        loadUserBet(loggedInUser);
    }
    
    loadScoreboard();

    if (isLocked()) {
        disableBets();
    }
};

//reset button
function resetBets() {
    if (sessionStorage.getItem("loggedInUser") !== "admin") {
        alert("Only admin can reset bets!");
        return;
    }
    localStorage.removeItem("userBets");
    loadScoreboard(); // Refresh the scoreboard to remove all bets
    alert("All bets have been reset.");
}

