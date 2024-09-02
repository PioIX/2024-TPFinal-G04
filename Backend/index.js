var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
var MySql = require("./modulos/mysql.js")

var app = express(); //Inicializo express
var port = process.env.PORT || 3001; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
app.get('/saludo', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    res.send({respuesta: `Respuesta del Backend`})
})

app.get('/traerJugador', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    const respuesta = await MySql.realizarQuery(`select * from Players`)
    res.send(respuesta)
    
})

app.post('/agregarUsuario', async function(req,res) {
    console.log(req.body)
    await MySql.realizarQuery(`INSERT INTO Players (user, password) 
    VALUES('${req.body.user}', '${req.body.password}')`)
    
    res.send("ok")
})

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3001/');
    console.log('   [GET] http://localhost:3001/saludo');
    console.log('   [POST] http://localhost:3001/nombreDelPedido');
});
