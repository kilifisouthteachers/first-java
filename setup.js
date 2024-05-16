const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('members.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        membershipNumber TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT
    )`);

    db.run(`INSERT OR IGNORE INTO meta (key, value) VALUES ('current_membership_number', '0')`);
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Database setup complete.');
});