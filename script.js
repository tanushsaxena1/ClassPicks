function openInput(type) {
    document.getElementById(`input-${type}`).style.display = "block";
}

// Allow pressing "Enter" to submit name & bet
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let activeInput = document.activeElement;
        let type = activeInput.id.includes("under") ? "under1" : "over1";
        addBet(type);
    }
});

function addBet(type) {
    let nameInput = document.getElementById(`name-${type}`);
    let betInput = document.getElementById(`bet-${type}`);

    let name = nameInput.value.trim();
    let betAmount = betInput.value.trim();

    if (name && betAmount && !isNaN(betAmount) && betAmount > 0) {
        let list = document.getElementById(`list-${type}`);
        let listItem = document.createElement("li");
        listItem.textContent = `${name} - $${parseFloat(betAmount).toFixed(2)}`;
        list.appendChild(listItem);
        
        nameInput.value = ""; // Clear name input
        betInput.value = ""; // Clear bet amount input
        document.getElementById(`input-${type}`).style.display = "none"; // Hide input
    } else {
        alert("Please enter a valid name and bet amount.");
    }
}

function selectResult(resultType) {
    document.getElementById(`result-over1`).classList.remove("selected");
    document.getElementById(`result-under1`).classList.remove("selected");

    document.getElementById(`result-${resultType}`).classList.add("selected");
}
