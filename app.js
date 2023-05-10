const express = require('express');
const requestTransfer = require('express-request-transfer');
const moment = require('moment');
const cors = require('cors');
const sequelize = require('./conexion-base-datos');
const postRegister = require('./routes/registroBack');
const postLogin = require('./routes/loginBack');
const getPublications = require('./routes/publicatBack');
const postPublications = require('./routes/publicatBack')
const postLogin = require ('./routes/loginBack')
const postFriends = require ('./routes/friendsBack')
const { getUser } = require("./routes/usersBack");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

app.use(requestTransfer);
app.use(express.json());
app.use(cors());




//Rutas
app.get('/', async (req, res) => {
    res.status(200).send('Helo World')
})
//Registro
app.get('/register', async (req, res) => {
    res.status(200).send('Helo World')
})

app.post('/register', postRegister);


//Login
app.get('/login', async (req, res) => {
    res.status(200).send('Helo World')
})
/* app.get('/login', async (req, res) => {
    console.log(result)
    res.status(200).send(result)
}) */
app.post('/login', postLogin);


//PUBLICACIONES :  cargar y crear en la página de inicio

/* app.get('/publications', getPublications);  */
app.get('/publications', async function(req, res) {
    const user_id = req.query.user_id;
    console.log(req.query.user_id)
    if (user_id) {
        sequelize.query('SELECT * FROM posts WHERE user_id = :user_user', { replacements: { user_user: user_id }, type: sequelize.QueryTypes.SELECT })
            .then(posts => {
                console.log(posts.length);
                console.log(posts)
                res.status(200).send({ posts })
                /* if (Object.keys(posts).length === 0) {
                    console.log('No existen publicaciones para este usuario')
                    res.status(200).send({ result: false, message: "No existen publicaciones para este usuario" })
                } else {
                    console.log('Si existen publicaciones para este usuario')
                    res.status(200).send({ result: posts, message: 'Si existen publicaciones para este usuario' })
                } */
            })
    }
}); 

app.post('/createPublications', postPublications); 


//Amigos

app.get('/friends', async (req, res) => {
    res.status(200).send('Render friends')
})
app.post('/friends', postFriends);

//Recoger datos usuarios//
// app.use("/", userRouter);

// router.route("/:user_id")
// 	.get(getUser) 

app.route("/:user_id")
	.get(getUser) 

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`)
});
