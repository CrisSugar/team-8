const sequelize = require('../conexion-base-datos');



/* --------------seleccionar las publicaciones de la tabla hechas por los seguidores del usuario logueado y por el usuario logueado y mostrar tb el nombre y la imagen del autor------------------------ */


const getAllPublications = async function (req, res, user) {
  const userId = req.params.user_id;
  sequelize.query(`
    SELECT posts.*, users.name as user_name, users.image as user_image
    FROM posts
    INNER JOIN users ON posts.user_Id = users.user_id
    WHERE posts.user_Id = ${userId}
    OR posts.user_Id IN (
      SELECT user_friend2_id
      FROM friendship
      WHERE user_friend1_id = ${userId} AND status_friendship = 1 
      UNION
      SELECT user_friend1_id
      FROM friendship
      WHERE user_friend2_id = ${userId} AND status_friendship = 1
    )
    ORDER BY posts.post_creation_date DESC
    `, {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT,
  })
    .then(posts => {
      res.status(200).send({ posts })
    })
};



/* -------------crear publicaciones------------------------------------------- */

const postPublications = async function (req, res) {
  const { textArea, formattedDateTime, editionDate, likes, comments, user_id } = req.body
  console.log(req.body);
  if (!textArea) {
    console.log('Escribe una publicación')
    res.status(200).send({ result: false, message: "Escribe una publicación" })
  }
  else {
    sequelize.query('INSERT INTO posts (post_content, post_creation_date, post_edition_date, likes, comments, user_id) VALUES (?,?,?,?,?,?)',
      { replacements: [req.body.textArea, req.body.formattedDateTime, req.body.editionDate, req.body.likes, req.body.comments, req.body.user_id], type: sequelize.QueryTypes.INSERT })
    console.log('Publicación creada')

    const publication = {
      textArea, formattedDateTime, editionDate, likes, comments, user_id
    }
    res.status(200).send(publication)
  }

}


module.exports = {
  getAllPublications,
  postPublications
};
