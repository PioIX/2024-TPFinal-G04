var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
const cors = require('cors'); 
const session = require('express-session');				// Para el manejo de las variables de sesión
const MySql = require('./modulos/mysql.js')


var app = express(); //Inicializo express
var port = process.env.PORT || 3001; //Ejecuto el servidor en el puerto 3001

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


const server = app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3001/');
    console.log('   [GET] http://localhost:3001/usuarios');
    console.log('   [GET] http://localhost:3001/insertarUsuario');
    
});

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: "http://localhost:3000",            	// Permitir el origen localhost:3000
		methods: ["GET", "POST", "PUT", "DELETE"],  	// Métodos permitidos
		credentials: true                           	// Habilitar el envío de cookies
	}
});


const sessionMiddleware = session({
	//Elegir tu propia key secreta
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});



app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */



app.post('/usuarios', async function(req,res){
    console.log(req.body)
    let respuesta = ""
    if (req.body.nombre_usuario) {
         respuesta = await MySql.realizarQuery(`SELECT * FROM Users WHERE 
        user = "${req.body.nombre_usuario}" and password = "${req.body.contraseña}";`)
    }
    else{
        respuesta = ""
    }
    res.send(respuesta) 
   
})


app.post('/insertarUsuario', async function(req,res) {
    console.log(req.body)
    var usuarioNuevo = await MySql.realizarQuery(`SELECT * FROM Users WHERE user = '${req.body.nombre_usuario}'`);
    if (usuarioNuevo.length==0) {
        await MySql.realizarQuery(`INSERT INTO Users (user, password) 
        VALUES ('${req.body.nombre_usuario}', '${req.body.contraseña}')`);
        res.send({status: "Ok"})
    } else {
        res.send({status: "Ya existe"});
    }
})
//Pongo el servidor a escuchar

/*
app.put('/modificarUsuarioPartidasperdidas', async function(req,res){
    console.log(req.body)
    response = await MySql.realizarQuery(`SELECT partidas_perdidas FROM Usuarios WHERE id_usuario= ${req.body.id_usuario}`);
    await MySql.realizarQuery(`UPDATE Usuarios SET partidas_perdidas = '${req.body.partidas_perdidas + response[0].partidas_perdidas}' WHERE id_usuario= ${req.body.id_usuario}`);
    res.send({perdidas: req.body.partidas_perdidas + response[0].partidas_perdidas})
})

app.delete('/eliminarUsuario', async function(req,res){
    console.log(req.body)
    await MySql.realizarQuery(`DELETE FROM Usuarios WHERE id_usuario = ${req.body.id_usuario}`);
    res.send("ok")
})
*/

io.on("connection", (socket) => {
	const req = socket.request;

	socket.on('joinRoom', data => {
		console.log("🚀 ~ io.on ~ req.session.room:", req.session.room)
		if (req.session.room != undefined && req.session.room.length > 0)
			socket.leave(req.session.room);
		req.session.room = data.room;
		socket.join(req.session.room);
		console.log(req.session.idUsuario)

		io.to(req.session.room).emit('chat-messages', { user: req.session.user, room: req.session.room });
	});

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
        console.log("Mensaje: ", data.message);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', data => {
		io.to(req.session.room).emit('newMessage', { room: req.session.room, message: data });
	});
	socket.on('numeros', data => {
		io.to(req.session.room).emit('newNumero', { room: req.session.room, message: data });
	});


	socket.on('bombas', data => {
		io.to(req.session.room).emit('newBombas', { room: req.session.room, message: data });
	});
    /**
     socket.on('newMessage', (data)=>{
     console.log("Message: ", data)
      }); */
	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});