const express = require('express');
const cors = require('cors');
const sequelize = require('../conexion-base-datos');
var mysql2 = require('mysql2');



// app.get("/users", (req, res) => {
const postFriends = async function (req, res) {
  // me fijo si enviaron un id:
  const { id } = req.query;
  // le agrego el id a la query si lo recibo
  const sqlQuery =
    `SELECT id, name, country, email FROM users` +
    (id ? ` WHERE id = ${id}` : "");
  db.query(sqlQuery(err, results => {
    if (err) {
      res.status(400).send({ error: 'usuario no encontrado' })
    } else {
      // results será un usuario si usamos un id, o un array de usuarios si no lo usamos.
      res.status(200).send(results)
    }
  }))
};


module.exports = postFriends