const express = require('express');
const app = express();
const sequelize = require('./conexion-base-datos');

async function newUser(){
	let array_insert = ["8","Demo","Demo","Tecler","Ensenada","demo@gmail.com","demoensenada","","Spain","Gijón","63322504","30","1992-11-04","Programación","5 años programando","Leer, videojuegos, deportes extremos","Demo tecler","Programador","2023-04-28"];
	console.log(array_insert);
	sequelize.query('INSERT INTO `users`(`user_id`,`username`,`name`,`surname_first`,`surname_second`,`email`,`password`,`adress`,`country`,`city`,`telephone_number`,`age`,`birthdate`,`studies`,`experience`,`hobbies`,`linkedin`,`role`,`registration_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		{replacements: array_insert, type: sequelize.QueryTypes.INSERT }
	).then(function(proyecto){
		console.log(proyecto);
	})
}

newUser();