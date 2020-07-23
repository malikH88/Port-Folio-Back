const express = require('express');
const connection = require('../server/db.js');

const router = express.Router();

/* ----- GET all projet ----- */

router.get('/',(req, res) =>{
    connection.query('SELECT * from project', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération du projet');
      } else {
        res.status(200).json(results);
      }
    });
});

/* ----- GET projet by ID ----- */

router.get('/:id', (req, res) => {
    const idproject = req.params.id;
    connection.query('SELECT * from project WHERE id = ?', [idproject], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur lors de la récupération d'un projet`);
      } 
      if (results.length === 0) {
        return res.status(404).send('projet non trouvée');
      } else {
        res.json(results[0]);
      }
    });
});

/* ----- POST projet ----- */

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.info == null || formData.info === '') {
      res.status(400).send("Les données du Projet sont mal renseigné");
    } else {
      connection.query('INSERT INTO project SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un Projet");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
});

/* ----- PUT project by ID ----- */

router.put('/:id', (req, res) => {
    const idCategory = req.params.id;
    const formData = req.body;
    if (formData.text == null || formData.text === '') {
      res.status(400).send("Les données sont mal renseigné");
    } else {
      connection.query('UPDATE project SET ? WHERE id=?' , [formData, idCategory], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un Projet");
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* ----- DELETE a sitecard ----- */

router.delete('/:id', (req, res) => {
    const idproject = req.params.id;
    connection.query('DELETE FROM project WHERE id = ?', idproject, err => {
      if (err) {
        res.status(500).send(`Erreur lors de la suppression d'un Projet`);
      } else {
        res.status(204);
      }
    });
});

module.exports = router;