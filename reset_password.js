document.addEventListener("DOMContentLoaded", function() {
    const resetPasswordForm = document.getElementById("resetPasswordForm");

    resetPasswordForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        sendPasswordResetEmail(email);
    });

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function sendPasswordResetEmail(email) {
        
        console.log("Sending password reset email to:", email);

        alert("A password reset link has been sent to your email address.");
    }
});