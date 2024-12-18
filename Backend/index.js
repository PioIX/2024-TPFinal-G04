var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
const cors = require('cors');
const session = require('express-session');				// Para el manejo de las variables de sesión
const MySql = require('./modulos/mysql.js')


var app = express(); //Inicializo express
var port = process.env.PORT || 3001; //Ejecuto el servidor en el puerto 3001

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const server = app.listen(port, function () {
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('   [GET] http://localhost:3001/');
	console.log('   [GET] http://localhost:3001/usuarios');
	console.log('   [GET] http://localhost:3001/insertarUsuario');
	console.log('   [GET] http://localhost:3001/traerJugador');

});

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: "http://localhost:3000",            	// Permitir el origen localhost:3000 y 3001
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

let usuariosEnSala = 0;

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});


app.put('/cambiarPuntaje', async function (req, res) {
	console.log(req.body)
	const respuesta = await MySql.realizarQuery(`UPDATE Players 
    SET 
    point = ${req.body.point}
    WHERE id = ${req.body.id};`)
	console.log({ respuesta })
	res.send("ok")
})

app.get('/', function (req, res) {
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */



app.post('/usuarios', async function (req, res) {
	console.log(req.body)
	let respuesta = ""
	if (req.body.nombre_usuario) {
		respuesta = await MySql.realizarQuery(`SELECT * FROM Users WHERE 
        user = "${req.body.nombre_usuario}" and password = "${req.body.contraseña}";`)
	}
	else {
		respuesta = ""
	}
	res.send(respuesta)

})
app.get('/traerJugador', async function (req, res) {
	const respuesta = await MySql.realizarQuery(`select * from Ranking`)
	res.send(respuesta)

})


app.post('/insertarUsuario', async function (req, res) {
	console.log(req.body)
	var usuarioNuevo = await MySql.realizarQuery(`SELECT * FROM Users WHERE user = '${req.body.nombre_usuario}'`);
	if (usuarioNuevo.length == 0) {
		await MySql.realizarQuery(`INSERT INTO Users (user, password) 
        VALUES ('${req.body.nombre_usuario}', '${req.body.contraseña}')`);
		res.send({ status: "Ok" })
	} else {
		res.send({ status: "Ya existe" });
	}
})
app.post('/insertarRanking', async function (req, res) {
	console.log(req.body)
	await MySql.realizarQuery(`INSERT INTO Ranking (username1, username2,time,seconds) 
        VALUES ('${req.body.username1}', '${req.body.username2}', '${req.body.time}', ${req.body.second})`);
	res.send({ status: "Ok" })

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
	socket.on('morse', data => {
		io.to(req.session.room).emit('newMorse', { room: req.session.room, message: data });
	});
	socket.on('simon', data => {
		io.to(req.session.room).emit('newSimon', { room: req.session.room, message: data });
	});
	socket.on('state', data => {
		io.to(req.session.room).emit('newState', { room: req.session.room, message: data });
	});
	socket.on('laberinto', data => {
		io.to(req.session.room).emit('newLaberinto', { room: req.session.room, message: data });
	});
	socket.on('labwin', data => {
		io.to(req.session.room).emit('newLabwin', { room: req.session.room, message: data });
	});
	socket.on('traduccion', data => {
		io.to(req.session.room).emit('newTraduccion', { room: req.session.room, message: data });
	});
	socket.on('contrasena', data => {
		io.to(req.session.room).emit('newContrasena', { room: req.session.room, message: data });
	});
	socket.on('devolucion', data => {
		io.to(req.session.room).emit('newDevolucion', { room: req.session.room, message: data });
	});
	socket.on('flechas', data => {
		io.to(req.session.room).emit('newFlechas', { room: req.session.room, message: data });
	});
	socket.on('startflechas', data => {
		io.to(req.session.room).emit('newStartFlechas', { room: req.session.room, message: data });
	});
	socket.on('winflechas', data => {
		io.to(req.session.room).emit('newWinflechas', { room: req.session.room, message: data });
	});
	socket.on('maniqui', data => {
		io.to(req.session.room).emit('newManiqui', { room: req.session.room, message: data });
	});
	socket.on('simbolo', data => {
		io.to(req.session.room).emit('newSimbolo', { room: req.session.room, message: data });
	});
	socket.on('simboloState', data => {
		io.to(req.session.room).emit('newSimboloState', { room: req.session.room, message: data });
	});
	socket.on('timer', data => {
		io.to(req.session.room).emit('newTimer', { room: req.session.room, message: data });
	});
	socket.on('vidas', data => {
		io.to(req.session.room).emit('newVidas', { room: req.session.room, message: data });
	});
	socket.on('reloj', data => {
		io.to(req.session.room).emit('newReloj', { room: req.session.room, message: data });
	});
	socket.on('ganasteBomba', data => {
		io.to(req.session.room).emit('newGanasteBomba', { room: req.session.room, message: data });
	});
	let vector = [{
		codigo: "Kaboom",
		user1: 0,
		user2: 0,
	}]

	socket.on('resetFunction', data => {
		io.to(req.session.room).emit('newResetFunction', { room: req.session.room, message: data });
	});


	socket.on('refrescar', data => {
		io.to(req.session.room).emit('newRefrescar', { room: req.session.room, message: data });
	});

	/**
	 socket.on('newMessage', (data)=>{
	 console.log("Message: ", data)
	  }); */
	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});

