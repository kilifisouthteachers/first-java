let members = [];

function generateMembershipNumber() {
    let num = ("000" + (members.length + 1)).slice(-4);
    return "kstw" + num;
}

function registerMember(name, institution, cluster, safaricomnumber, email) {
    let membershipNumber = generateMembershipNumber();
    members.push({ name, email, membershipNumber, institution, cluster, safaricomnumber });
    return membershipNumber;
}

function isMemberRegistered(email) {
    return members.some(member => member.email === email);
}

function redirectToLogin() {
    alert("You are already registered. Redirecting to login page ...");
}

function redirectToContribution() {
    alert("Redirecting to contribution...");
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let institution = document.getElementById("institution").value;
    let cluster = document.getElementById("cluster").value;
    let safaricomnumber = document.getElementById("safaricomnumber").value;
    let email = document.getElementById("email").value;
    let isRegistered = isMemberRegistered(email);
    if (isRegistered) {
        redirectToLogin();
    } else {
        let membershipNumber = registerMember(name, institution, cluster, safaricomnumber, email);
        alert("Registration successful! Your membership number is: " + membershipNumber);
        
        document.getElementById("membershipNumber").innerText = "Membership Number: " + membershipNumber;
        displayRegisteredMembers(); 
    }
});


function displayRegisteredMembers() {
    let memberList = document.getElementById("memberList");
    memberList.innerHTML = ""; 

    members.forEach(member => {
        let listItem = document.createElement("li");
        listItem.textContent = `Name: ${member.name}, Email: ${member.email}, Membership Number: ${member.membershipNumber}, Institution: ${member.institution}, Cluster: ${member.cluster}, Safaricom Number: ${member.safaricomnumber}`;
        memberList.appendChild(listItem);
    });
}