const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('members.db');

function generateMembershipNumber() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT value FROM meta WHERE key = "current_membership_number"';
        db.get(sql, [], (err, row) => {
            if (err) {
                console.error("Error fetching current membership number:", err);
                reject(err);
            } else {
                const currentNumber = parseInt(row.value, 10) + 1;
                const newNumber = 'kstw' + currentNumber.toString().padStart(4, '0');
                db.run('UPDATE meta SET value = ? WHERE key = "current_membership_number"', [currentNumber], (err) => {
                    if (err) {
                        console.error("Error updating current membership number:", err);
                        reject(err);
                    } else {
                        resolve(newNumber);
                    }
                });
            }
        });
    });
}

function registerMember(name, email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const membershipNumber = await generateMembershipNumber();
            const sql = 'INSERT INTO members (name, email, password, membershipNumber) VALUES (?, ?, ?, ?)';
            db.run(sql, [name, email, password, membershipNumber], function (err) {
                if (err) {
                    console.error("Error inserting new member:", err);
                    reject(err);
                } else {
                    resolve(membershipNumber);
                }
            });
        } catch (err) {
            console.error("Error during registration process:", err);
            reject(err);
        }
    });
}

function isRegistered(email) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) AS count FROM members WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) {
                console.error("Error checking registration status:", err);
                reject(err);
            } else {
                resolve(row.count > 0);
            }
        });
    });
}

document.getElementById("registrationForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const alreadyRegistered = await isRegistered(email);
        if (alreadyRegistered) {
            alert("You are already registered. Redirecting to login page...");
            window.location.href = "login.html";
        } else {
            const membershipNumber = await registerMember(name, email, password);
            alert("Registration successful! Your membership number is: " + membershipNumber);
            window.location.href = "contribute.html";
        }
    } catch (error) {
        console.error('Error registering member:', error);
        alert('An error occurred during registration. Please try again later.');
    }
});