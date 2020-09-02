#!/usr/bin/env nodejs

require('dotenv').config()

const express = require('express')

const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express()



//***SÉCURITÉ***
//HELMET
// -> Helmet aide à protéger l'application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
var helmet = require('helmet');
app.use(helmet());

//Désactivez au minimum l’en-tête X-Powered-By
app.disable('x-powered-by');

//N’utilisez pas de nom de cookie de session par défaut
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 's3Cur3',
    name: 'sessionId',
})
);

//Cors permet l'accès seulement au site d'origine

const cors = require('cors')
app.use(cors({
    origin: ['http://www.doutreguay.com', 'http://doutreguay.com','http://gestion.doutreguay.com',  'http://localhost:8000','http://localhost:3000'],
    default: 'http://www.doutreguay.com'
}));
// app.use(cors({
//     origin: "http://www.doutreguay.com:80/"
// }));
//Site

app.get('/', function (req, res) {
    res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
})


//Connection à la base de donnée
const mongoose = require('mongoose')
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then((info) => console.log('Connection réussie'))
    .catch((e) => console.log(e))
const db = mongoose.connection
db.on('error', (error) => console.log('error :\n %s', error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())


//API
const eventsRouter = require('./routes/events')
app.use('/events', eventsRouter)

const individusRouter = require('./routes/individus')
app.use('/individus', individusRouter.router)

const inventairesRouter = require('./routes/inventaires')
app.use('/inventaire', inventairesRouter)

const organisationsRouter = require('./routes/organisations')
app.use('/organisations', organisationsRouter)

const usersRouter = require('./routes/users')
app.use('/user', usersRouter)

const slackRouter = require('./routes/slack')
app.use('/slack', slackRouter.router)

const projetWebRouter = require('./routes/projets_web')
app.use('/projets_web', projetWebRouter)
const projetWebTaskRouter = require('./routes/projets_web_task')
app.use('/', projetWebTaskRouter)

const passwordsRouter = require('./routes/passwords-manager')
app.use('/passwords', passwordsRouter)

const biblioRouter = require('./routes/biblio')
app.use('/biblio', biblioRouter)


const server = http.createServer(app)
const io = socketIo(server); // < Interesting!
const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

io.on("connection", (socket) => {

    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on('message', (message) => {
        console.log(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('connected', (user) => {
        individusRouter.getIndividuById(user.id_fiche).then((result) => {
            socket.pseudo = result.prenom + ' ' + result.nom;
            socket.id_fiche = user.id_fiche
            socket.user = user

            console.log(`${socket.pseudo} connected!`);
            socket.emit('message', `Bienvenue ${socket.pseudo} !`);
            socket.broadcast.emit('connected', socket.pseudo);

        })

    });
    socket.on("disconnected", () => {
        console.log("Client disconnected");
        socket.broadcast.emit('disconnected', socket.pseudo);
    });
});
//Gestionnaire de mdp

server.listen(port, () => console.log(`Listening on port ${port}`));

// let listener = app.listen(3005, () => { console.log(listener.address()); console.log('Listening ' + listener.address().address + '|' + listener.address().family + ' on port ' + listener.address().port) }); //Listening on port 8888

