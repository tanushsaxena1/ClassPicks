function openInput(type) {
    document.getElementById(`input-${type}`).style.display = "block";
}

function addName(type) {
    let input = document.getElementById(`name-${type}`);
    let name = input.value.trim();

    if (name) {
        let list = document.getElementById(`list-${type}`);
        let listItem = document.createElement("li");
        listItem.textContent = name;
        list.appendChild(listItem);
        
        input.value = ""; // Clear input
        document.getElementById(`input-${type}`).style.display = "none"; // Hide input
    }
}

function selectResult(resultType) {
    document.getElementById(`result-over1`).classList.remove("selected");
    document.getElementById(`result-under1`).classList.remove("selected");

    document.getElementById(`result-${resultType}`).classList.add("selected");
}
