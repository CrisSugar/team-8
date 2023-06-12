const sequelize = require('../conexion-base-datos')


const updateFriendshipStatus = async function (req, res) {
  const user_id = req.params.user_id;
  const newStatus = req.body.status_friendship;
  const friend = req.body.friend;

  try {

    const checkIfExistsQuery = `
      SELECT * FROM friendship
      WHERE (user_friend1_id = '${user_id}' AND user_friend2_id = '${friend}')
        OR (user_friend1_id = '${friend}' AND user_friend2_id = '${user_id}');
    `;
    const [rows] = await sequelize.query(checkIfExistsQuery);

    if (rows.length === 0) {

      const insertQuery = `
      INSERT INTO friendship (user_friend1_id, user_friend2_id, status_friendship)
      VALUES ('${user_id}', '${friend}', 1);
  `;
      await sequelize.query(insertQuery);
      res.send('La relación de amistad se insertó correctamente.');
    } else {

      const updateQuery = `
      UPDATE friendship
      SET status_friendship = ${newStatus}
      WHERE (user_friend1_id = '${user_id}' AND user_friend2_id = '${friend}')
        OR (user_friend1_id = '${friend}' AND user_friend2_id = '${user_id}');
    `;
      await sequelize.query(updateQuery);
      res.send('La fila se insertó y el estado de amistad se actualizó correctamente.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};


module.exports.updateFriendshipStatus = updateFriendshipStatus;
