const express = require('express');
const cors = require('cors');
const sequelize = require('../conexion-base-datos')

const updateFriendshipStatus = async function (req, res) {
  const user_id = req.params.user_id;
  const newStatus = req.body.status_friendship; // ------------Valor nuevo: 0 o 1------------//
  const friend = req.body.friend;

  const insertQuery = `
      INSERT INTO friendship (user_friend1_id, user_friend2_id)
      VALUES ('${user_id}', '${friend}');
    `;

  const updateQuery = `
      UPDATE friendship
      SET status_friendship = ${newStatus}
      WHERE (user_friend1_id = '${user_id}' AND user_friend2_id = '${friend}')
        OR (user_friend1_id = '${friend}' AND user_friend2_id = '${user_id}');
    `;

  try {
    await sequelize.query(insertQuery);
    await sequelize.query(updateQuery);
    res.send('La fila se insertó y el estado de amistad se actualizó correctamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports.updateFriendshipStatus = updateFriendshipStatus;
