require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./db.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/jwt');
const { authenticateWithJwt } = require('../services/jwt');

/*----import routes------*/

const project = require('../routes/project.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});

app.get('/', authenticateWithJwt, (req, res) => {
  res.status(200).json('hello World');
});


app.use('/project', project);

app.post('/admin/register', (req, res) => {
  const formData = req.body;

  if ((formData.username == null || formData.username === '') || (formData.password == null || formData.password === '')) {
    res.status(422).json("Vous vous êtes mal enregistré");
  } else {
    connection.query('SELECT * FROM admin where username = ?', formData.username, (err, results) => {
      if (results[0] != null) {
        res.status(500).json({ message: "Username deja utilisé" });
      } else {
        bcrypt.hash(formData.password, 10, function (err, hash) {
          formData.password = hash
          connection.query('INSERT INTO admin SET ?', formData, (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send("Erreur lors de l'enregistrement");
            } else {
              res.status(201).send({ ...formData, password: null, id: results.insertId });
            }
          });
        });
      }
    })
  }
});

app.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if ((username == null || username === '') || (password == null || password === '')) {
    res.status(422).json("E-Mail ou Mot de passe incorrect");
  } else {
    connection.query('SELECT password FROM admin WHERE username = ? ', username, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'authentification");
      } else if (results[0] == null) {
        res.status(400).send("Cet utilisateur n'existe pas");
      } else {
        const hash = results[0].password;
        bcrypt.compare(password, hash, function (err, same) {
          if (same) {
            const token = createToken(username)
            res.json({
              username,
              token,
            });
          } else {
            res.status(400).send("connexion refusée");
          }
        });
      }
    });
  }
});

module.exports = app