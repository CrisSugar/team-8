require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('../conexion-base-datos');
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');



const postRegister = async function (req, res) {
  const { name, email, password, age, phone, city, country, hobbies, experience, image } = req.body; 
  console.log("no llega el body")
  console.log(req.body);

  if (name) {
    try {
      // Comprobar si ya existe el usuario
      sequelize.query('SELECT * FROM users WHERE name = :user_user', { replacements: { user_user: name }, type: sequelize.QueryTypes.SELECT })
        .then(async users => {
          console.log(users);
          if (Object.keys(users).length === 0) {
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear usuario
            sequelize.query('INSERT INTO users (name,email,age,password,telephone_number,city,country,hobbies,experience,image) VALUES (?,?,?,?,?,?,?,?,?,?)',
              { replacements: [name ?? "", email ?? "", age ?? "", hashedPassword ?? "", phone ?? "", city ?? "", country ?? "", hobbies ?? "", experience ?? "", image ?? ""], type: sequelize.QueryTypes.INSERT });

            console.log('No existe el usuario');
            res.status(200).send({ result: true, message: "Usuario creado con éxito, inicie sesión" });
          } else {
            console.log('El usuario ya existe');
            res.status(200).send({ result: false, message: 'Este usuario ya está registrado, inicie sesión' });
          }
        });
    } catch (error) {
      console.log(error);
    }
    console.log('prueba');
  }
};

module.exports = postRegister;
