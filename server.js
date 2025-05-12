const express = require('express');
const mustacheExpress = require('mustache-express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db/devlog.sqlite');


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/devlog', (req, res) => {
  db.all('SELECT * FROM devlog_entries ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.render('devlog', { entries: rows });
  });
});


app.post('/devlog', (req, res) => {
  const { title, content } = req.body;
  db.run(
    'INSERT INTO devlog_entries (title, content) VALUES (?, ?)',
    [title, content],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to add entry');
      }
      res.redirect('/devlog');
    }
  );
});


app.post('/devlog/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM devlog_entries WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Failed to delete entry');
    res.redirect('/devlog');
  });
});

app.post('/devlog/edit/:id', express.json(), (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  db.run(
    'UPDATE devlog_entries SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to edit entry');
      }
      res.status(200).send('Entry updated');
    }
  );
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
