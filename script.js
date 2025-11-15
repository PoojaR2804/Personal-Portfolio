function addRec() {
    
    let text = document.getElementById("rec-input").value;
    if (text.trim() === "") {
        showPopup("Please enter something!", "blueviolet", "black");  
        return;
    }

    document.getElementById("recommendations-list").innerHTML += 
        `<p>"${text}" - Anonymous</p>`;

    showPopup("Recommendation submitted!", "blueviolet", "black"); 
    document.getElementById("rec-input").value = "";
}

function showPopup(message, bgColor, textColor) {
    let popup = document.createElement("div");
    popup.className = "custom-alert";
    popup.innerText = message;

    
    popup.style.backgroundColor = bgColor;
    popup.style.color = textColor;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 2500);
}

