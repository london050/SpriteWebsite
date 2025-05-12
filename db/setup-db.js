const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/devlog.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS devlog_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

db.close();
