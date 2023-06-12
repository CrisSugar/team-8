const cors = require('cors');
const sequelize = require('../conexion-base-datos');
var mysql2 = require('mysql2');
const express = require('express');

const allUser = async function (req, res) {
    sequelize.query('SELECT * FROM users', { type: sequelize.QueryTypes.SELECT })
        .then(users => {
            console.log(users.length);
            console.log(users)
            res.json(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        });
};


const namesUsers = async (req, res) => {
    try {
        const namesWriters = await sequelize.query('SELECT users.name , posts.* FROM users JOIN posts ON users.user_id = posts.user_id ORDER BY post_creation_date DESC', { type: sequelize.QueryTypes.SELECT });
        res.send(namesWriters);
        console.log(namesWriters);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
}


module.exports = {
    allUser,
    namesUsers
};
