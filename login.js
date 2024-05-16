document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "example@example.com" && password === "password123") {
        showFeedbackMessage("Login successful!", "green");
        redirectToContribute(); 
    } else {
        showFeedbackMessage("Invalid email or password. Please try again.", "red");
    }
});

function showFeedbackMessage(message, color) {
    let feedbackMessage = document.getElementById("feedbackMessage");
    feedbackMessage.textContent = message;
    feedbackMessage.style.color = color;
    feedbackMessage.style.display = "block"; 
}

function redirectToContribute() {
    window.location.href = "contribute.html";
}