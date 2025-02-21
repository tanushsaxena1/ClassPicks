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

    // Grab the buttons
    const lockTradesBtn = document.getElementById("lock-trades-btn");
    const unlockTradesBtn = document.getElementById("unlock-trades-btn");
    const resetBetsBtn = document.getElementById("reset-bets-btn");
    const betBox = document.querySelector(".bet-box");
    const adminEdit = document.getElementById("admin-edit"); // Edit section

    if (username === "admin") {
        lockTradesBtn.style.display = "block";
        unlockTradesBtn.style.display = "block";
        resetBetsBtn.style.display = "block";
        betBox.style.display = "none"; // Admin cannot place bets
        adminEdit.style.display = "block"; // Show edit bet feature
    } else {
        lockTradesBtn.style.display = "none";
        unlockTradesBtn.style.display = "none";
        resetBetsBtn.style.display = "none";
        betBox.style.display = "block";
        adminEdit.style.display = "none"; // Hide edit feature for normal users
    }

    if (isLocked()) {
        disableBets();
    }
}

// Lock trades function (Only Admin)
function lockTrades() {
    if (sessionStorage.getItem("loggedInUser") !== "admin") {
        alert("Only admin can lock trades!");
        return;
    }
    localStorage.setItem("tradesLocked", "true");
    disableBets();

    // Highlight the button
    document.getElementById("lock-trades-btn").classList.add("active");
    document.getElementById("unlock-trades-btn").classList.remove("active");
}

// Unlock trades function (Only Admin)
function unlockTrades() {
    if (sessionStorage.getItem("loggedInUser") !== "admin") {
        alert("Only admin can unlock trades!");
        return;
    }
    localStorage.setItem("tradesLocked", "false");
    enableBets();

    // Highlight the button
    document.getElementById("unlock-trades-btn").classList.add("active");
    document.getElementById("lock-trades-btn").classList.remove("active");
}

// Enable bet buttons when unlocked
function enableBets() {
    document.querySelectorAll(".bet-option").forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    });
}

// Disable bet buttons
function disableBets() {
    document.querySelectorAll(".bet-option").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
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

// Place bet (disabled if trades locked)
function placeBet(type) {
    if (isLocked()) {
        alert("Bets are locked!");
        return;
    }

    const username = sessionStorage.getItem("loggedInUser");
    if (!username) return;

    const betAmount = document.getElementById("bet-amount").value.trim();
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount!");
        return;
    }

    document.getElementById("bet-over1").classList.remove("selected");
    document.getElementById("bet-under1").classList.remove("selected");
    document.getElementById(`bet-${type}`).classList.add("selected");

    let userBets = JSON.parse(localStorage.getItem("userBets")) || {};
    userBets[username] = { choice: type, amount: betAmount };
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
        listItem.textContent = `${username} ($${userBets[username].amount})`;
        document.getElementById(`score-${userBets[username].choice}`).appendChild(listItem);
    });
}

// On Page Load: Check session & Lock Status
window.onload = function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (loggedInUser) {
        showBets(loggedInUser);
        loadUserBet(loggedInUser);
    }

    // Load bet question from localStorage
    const savedBetQuestion = localStorage.getItem("betQuestion") || "Will Team A score more than 2.5 goals?";
    document.getElementById("bet-question").textContent = savedBetQuestion;

    loadScoreboard();

    if (isLocked()) {
        disableBets();
        document.getElementById("lock-trades-btn").classList.add("active");
    } else {
        document.getElementById("unlock-trades-btn").classList.add("active");
    }
};

// Reset button
function resetBets() {
    if (sessionStorage.getItem("loggedInUser") !== "admin") {
        alert("Only admin can reset bets!");
        return;
    }
    localStorage.removeItem("userBets"); // ✅ Erase all stored bets
    loadScoreboard(); // ✅ Refresh the scoreboard to clear bets
    alert("All bets have been reset.");
}

// Admin edit bet feature
function updateBet() {
    if (sessionStorage.getItem("loggedInUser") !== "admin") {
        alert("Only admin can edit bets!");
        return;
    }

    const newBet = document.getElementById("edit-bet-input").value.trim();
    if (!newBet) {
        alert("Bet question cannot be empty!");
        return;
    }

    localStorage.setItem("betQuestion", newBet);
    document.getElementById("bet-question").textContent = newBet;
    document.getElementById("edit-bet-input").value = ""; // Clear input

    alert("Bet updated successfully!");
}


