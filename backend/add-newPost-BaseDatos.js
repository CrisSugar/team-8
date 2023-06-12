/* const express = require('express');
const app = express();
const sequelize = require('./conexion-base-datos');

async function newPost() {
	let array_insert = ["6", "por fin viernes!", "2023-04-28 08:39:16", "", "5", "", "6"];
	console.log(array_insert);
	sequelize.query('INSERT INTO `posts`(`post_id`,`post_content`,`post_creation_date`,`post_edition_date`,`likes`,`comments`,`user_id`) VALUES (?,?,?,?,?,?,?)',
		{ replacements: array_insert, type: sequelize.QueryTypes.INSERT }
	).then(function (proyectoPost) {
		console.log(proyectoPost);
	})
}

newPost(); */