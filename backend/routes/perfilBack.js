const sequelize = require('../conexion-base-datos');
const mysql2 = require('mysql2');

const getUserDataById = async (req, res) => {
  try {
    const user_id = req.jwtInfo.userId;
    console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII" + user_id);
    
    const userData = await sequelize.query('SELECT * FROM users WHERE user_id = :id', { replacements: { id: user_id }, type: sequelize.QueryTypes.SELECT })
    console.log(userData)

    res.status(200).json(userData[0])

  } catch (error) {
    console.error(error);
    res.status(500).json({message: `Error al obtener los datos del usuario. ${error}`})
  }
};

const updateUserDataById = async (req, res) => {
  try {

    const user_id = req.jwtInfo.userId;
    console.log(user_id);
    const { name, country, age, experience, hobbies, email } = req.body;

    const updateQuery = `
        UPDATE users
        SET name = :name,
            country = :country,
            age = :age,
            experience = :experience,
            hobbies = :hobbies,
            email = :email
        WHERE user_id = :user_id;
      `;

    await sequelize.query(updateQuery, {
      replacements: {
        name,
        country,
        age,
        experience,
        hobbies,
        email,
        user_id
      },
      type: sequelize.QueryTypes.UPDATE
    });

    res.send('Los datos del usuario se actualizaron correctamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });

  }
};

module.exports.getUserDataById = getUserDataById;
module.exports.updateUserDataById = updateUserDataById;
