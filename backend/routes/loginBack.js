require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt')
const sequelize = require('../conexion-base-datos')



const postLogin = async function (req, res) {
    const { email, password } = req.body;
    console.log(req.body);


    /* -------función para generar y firmar el TOKEN ----------- */

    function generateAccessToken(payload) {
        return jwt.sign(payload, SECRET, { expiresIn: '2h' });
    }


    if (email) {
        const users = await sequelize.query('SELECT * FROM users WHERE email = :email_email', { replacements: { email_email: email }, type: sequelize.QueryTypes.SELECT });

        if (!users || users.length === 0) {
            console.log('No existe el usuario');
            res.status(200).send({ result: false, message: "Este usuario no existe, registrese" });

        } else {
            console.log('si existe el usuario');

            try {
                /* -------------comparación de contraseña en el navegador y hasheada en la BD------------------- */

                const isMatch = await bcrypt.compare(password, users[0].password);

                if (isMatch) {

                    console.log('Contraseña correcta');

                    /* ------------generando el TOKEN--------------------------------------------------------------- */

                    let payload = { userId: users[0].user_id, userName: users[0].name, userEmail: users[0].email, userAge: users[0].age, userPhone: users[0].telephone_number, userCity: users[0].city, userCountry: users[0].country, userHobbies: users[0].hobbies, userExperience: users[0].experience, userImage: users[0].image };
                    const token = generateAccessToken(payload);
                    payload.token = token
                    console.log(token)
                    console.log(payload)
                    console.log(payload.token) 
                    res.status(200).send({ result: payload, message: 'Usuario loggeado con éxito' });

                } else {

                    console.log('Contraseña incorrecta');
                    res.status(401).send({ result: false, message: 'Contraseña incorrecta' });
                }

            } catch {

                console.log('Error al comparar contraseñas:', err);
                res.status(500).send({ result: false, message: 'Error al comparar contraseñas' });
            }

        }
    }
}



module.exports = postLogin;

