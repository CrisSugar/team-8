const express = require('express');
const cors = require('cors');
const sequelize = require('../conexion-base-datos')


const followers = async function (req, res) {
	const user_id = req.params.user_id
	try {
		const followers = await sequelize.query(`SELECT DISTINCT * from users INNER JOIN friendship ON friendship.user_friend2_id  = users.user_id WHERE friendship.user_friend1_id = '${user_id}' AND friendship.status_friendship = 1`, { type: sequelize.QueryTypes.SELECT });

		console.log(followers);
		res.send(followers);

	} catch (error) {
		console.error(error);
		res.status(500).send('Error interno del servidor');
	}
};


module.exports.followers = followers