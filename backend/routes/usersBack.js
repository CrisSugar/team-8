const cors = require('cors');
const sequelize = require('../conexion-base-datos');
var mysql2 = require('mysql2');
const express = require('express')

const getUser = async (req, res) => {
    const user_id = req.params.user_id;
    try {

        const userData = await sequelize.query('SELECT * FROM users WHERE user_id = :id', { replacements: { id: user_id }, type: sequelize.QueryTypes.SELECT })
        console.log(userData)

        if(userData[0].lenght === 0) {
            res.status(404).json({message: "Usuario no encontrado"})
        }else {
            
            res.status(200).json(userData[0])
        }

    } catch (err) {
        return res.status(500).json({ msg: `Error obteniendo el usuario: ${err.message}` });
    }
};



module.exports.getUser = getUser;



