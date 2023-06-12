const express = require('express');
const app = express();
require('dotenv').config()

const requestTransfer = require('express-request-transfer');
const moment = require('moment');
const cors = require('cors');
const sequelize = require('./conexion-base-datos');
const postRegister = require('./routes/registroBack');
const postLogin = require('./routes/loginBack');
const { getPublications, getAllPublications, getPublicationsWritters, postPublications } = require('./routes/publicatBack')
const { updateFriendshipStatus } = require('./routes/friendsPrueba')
const postFriends = require('./routes/friendsBack')
const { getUser } = require("./routes/usersBack");
const { allUser, namesUsers } = require("./routes/allUsersback");
const { followers } = require('./routes/followBack');
const { getUserDataById } = require('./routes/perfilBack')
const { updateUserDataById } = require('./routes/perfilBack')
const { getRecomendacion } = require('./routes/recomendacionBack');
const { updateRecomendacion } = require('./routes/recomendacionBack');
// const port = process.env.PORT || 3000;
const port = 3001;
// import { isLogged } from './routes/middlewareToke';
const { isLogged } = require('./routes/middlewareToke')
app.use(requestTransfer);
app.use(express.json());
app.use(cors());
app.locals.JWT_SECRET = process.env.JWT_SECRET;


//Rutas
app.get('/', async (req, res) => {
    res.status(200).send('Estoy en el back')
})
//Registro
app.get('/register', async (req, res) => {
    res.status(200).send('Hello World')
})

app.post('/register', postRegister);

// Perfil//
app.route("/profile")
    .get(isLogged, getUserDataById)
    .patch(isLogged, updateUserDataById)

// Recomendaciones// 
app.route("/profile/recomendaciones/:user_id")
    .get(getRecomendacion)

app.route("/profile/recomendaciones/new")
    .post(updateRecomendacion)
    
//Login
app.get('/login', async (req, res) => {
    console.log(res)
    res.status(200).send(res)
})

app.post('/login', postLogin);


//PUBLICACIONES :  cargar y crear en la página de inicio
app.get('/allPublications/:user_id',isLogged, getAllPublications);
app.post('/createPublications',isLogged, postPublications);


//USUARIOS

//todos los usuarios
app.get('/users', isLogged, allUser);

//por nombre de usuario
app.get('/:name', namesUsers);

//por id de usuario
app.get('/user/:user_id', getUser); //ahora mismo no funciona



//Seguidores y Solicitudes de Seguimiento
//KAREN//
app.patch("/changeStatus/:user_id", isLogged, updateFriendshipStatus);

//Amigos

app.get('/friends', async (req, res) => {
    res.status(200).send('Render friends')
})
app.post('/friends', postFriends);

//Followers//

app.route("/followed/:user_id")
    .get( isLogged, followers);



app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`)
});

