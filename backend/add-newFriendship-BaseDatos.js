const express = require('express');
const app = express();
const sequelize = require('./conexion-base-datos');

async function newFriendship() {
	let array_insert = ["", "4 - SmilerKarenn", "6 - ser_cool", "2023-04-28 09:51:16", "1"];
	console.log(array_insert);
	sequelize.query('INSERT INTO `friendship`(`friendship_id`,`user_friend1_id`,`user_friend2_id`,`date_friendship`,`status_friendship`) VALUES (?,?,?,?,?)',
		{ replacements: array_insert, type: sequelize.QueryTypes.INSERT }
	).then(function (proyectoFriendship) {
		console.log(proyectoFriendship);
	})
}

newFriendship();