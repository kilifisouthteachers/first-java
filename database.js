const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('members.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY, name TEXT, email TEXT, membershipNumber TEXT, institution TEXT, cluster TEXT, safaricomNumber TEXT)');
});

function addMember(name, email, membershipNumber, institution, cluster, safaricomNumber) {
  db.serialize(() => {
    db.run('INSERT INTO members (name, email, membershipNumber, institution, cluster, safaricomNumber) VALUES (?, ?, ?, ?, ?, ?)', [name, email, membershipNumber, institution, cluster, safaricomNumber]);
  });
}

function exportToCSV() {
  db.serialize(() => {
    db.all('SELECT * FROM members', (err, rows) => {
      if (err) {
        console.error(err);
        return;
      }
      
      const csvData = rows.map(row => `${row.id},${row.name},${row.email},${row.membershipNumber},${row.institution},${row.cluster},${row.safaricomNumber}`).join('\n');
      fs.writeFileSync('members.csv', csvData);
      console.log('Members exported to CSV successfully.');
    });
  });
}

module.exports = {
  addMember,
  exportToCSV
};