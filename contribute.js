document.getElementById("contributionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let amount = document.getElementById("amount").value;
    let reason = document.getElementById("reason").value;

    let dateTime = new Date().toLocaleString();

    sendPayment(amount, reason, dateTime);
});

function sendPayment(amount, reason, dateTime) {
    console.log(`Payment Details:
    Amount: ${amount}
    Reason: ${reason}
    Date/Time: ${dateTime}`);

    alert("Thank you for your contribution! Payment has been sent to 0727284993 Fahima Abdalla.");
}