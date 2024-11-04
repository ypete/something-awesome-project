const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database(":memory:");

// Storing passwords in plain text is bad practice
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, password TEXT, isAdmin INTEGER DEFAULT 0)");
  db.run("INSERT INTO users (name, password, isAdmin) VALUES ('Alice', 'password', 1)");
  db.run("INSERT INTO users (name, password, isAdmin) VALUES ('Bob', 'password', 1)");
  db.run("INSERT INTO users (name, password, isAdmin) VALUES ('Carl', 'password', 1)");
  db.run("INSERT INTO users (name, password, isAdmin) VALUES ('Dave', 'password', 0)");
});

app.get("/user", (req, res) => {
  const { name } = req.query;
  
  // This is exploitable!
  const query = `SELECT * FROM users WHERE name = '${name}'`;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send("An error was encountered when executing query");
    } else {
      const formattedRows = rows.map(row => ({
        name: row.name,
        role: row.isAdmin ? "Admin" : "User"
      }));
      res.json(formattedRows);
    }
  });
});

app.post("/password", (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  const findUserQuery = "SELECT * FROM users WHERE name = ? AND password = ?";
  db.get(findUserQuery, [username, oldPassword], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (!row) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const updatePasswordQuery = "UPDATE users SET password = ? WHERE name = ?";
    db.run(updatePasswordQuery, [newPassword, username], function (err) {
      if (err) {
        return res.status(500).json({ message: "An error occured when updating password" });
      }

      res.status(200).json({ message: "Updated password successfully" });
    });
  });
});


app.get("/users", (req, res) => {
  const query = "SELECT name FROM users WHERE isAdmin = 0";

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      const users = rows.map(row => row.name);
      res.json({ users: users });
    }
  });
});

app.get("/admins", (req, res) => {
  const query = "SELECT name FROM users WHERE isAdmin = 1";

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      const admins = rows.map(row => row.name);
      res.json({ admins: admins });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, password, isAdmin = 0 } = req.body;

  const userExistsQuery = "SELECT * FROM users WHERE name = ?";
  db.get(userExistsQuery, [name], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (row) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertUserQuery = "INSERT INTO users (name, password, isAdmin) VALUES (?, ?, ?)";
    db.run(insertUserQuery, [name, password, isAdmin], function (err) {
      if (err) {
        res.status(500).json({ message: "An error was encounatered when adding user" });
      } else {
        res.status(201).json({ message: "Successful insertion", userId: this.lastID });
      }
    });
  });
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  // This is also exploitable!
  const query = `SELECT * FROM users WHERE name = '${name}' AND password = '${password}'`;

  db.get(query, [], (err, row) => {
    if (err) {
      res.status(500).send("An error was encountered during login");
    } else if (row) {
      if (row.isAdmin === 1) {
        res.json({ message: "Successful admin login", userId: row.id, redirect: "/admin" });
      } else {
        res.json({ message: "Successful user login", userId: row.id, redirect: "/user" });
      }
    } else {
      res.status(401).json({ message: "Invalid login" });
    }
  });
});

app.get("/resources", async (req, res) => {
  const { filename } = req.query;

  try {
    const filePath = path.join(__dirname, 'images', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File was not found");
    }

    const ext = path.extname(filename);
    let contentType;
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    res.set('Content-Type', contentType);
    res.set('Content-Disposition', `attachment; filename="${filename}"`);

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error was encountered when fetching resource");
  }
});

app.listen(PORT, () => {
  console.log("Off the ground!");
});
