"use client"
import Form from "@/components/form"
import styles from "./page.module.css"
import Button from "@/components/button"
import { useState } from "react";
export default function inicio() {


  async function ingresarUsuario() {
      if (await existeUsuario() == true) {
          alert("Haz ingresado")
      } else {
          alert("el usuario no existe o la contraseña no es correcta");
      }
  }

  async function existeUsuario() {
      const data = {
          nombre_usuario: inputNombre,
          contraseña: inputPassword
      }

      const response = await fetch('http://localhost:3001/usuarios', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })

      //Tengo que usar el await porque la respuesta del servidor es lenta
      const result = await response.json()
      if (result.length == 0) {
          console.log("El usuario no existe")
          return false
      } else {
          console.log("El usuario si existe")
          setUserId(result[0].id_usuario)
          return true
      }
  }

  function resetPlayer() {
    localStorage.setItem("userId", 0)
    localStorage.setItem("player2", false)
    localStorage.setItem("player1", false)
  }
  return (
  <html className={styles.all}>
  <body>
  <div className={styles.todo}>
      <div className={styles.inicio}>
        <a href="./select" onClick={resetPlayer} className={styles.a}>Play</a><br></br>
        <a href="./ranking" className={styles.b}>Ranking</a><br></br>
        <a href="../login" className={styles.c}>Cerrar sesion</a>
      </div>
  </div>
  </body>
  </html>
  )
}

/*"use client"

import Button from "@/components/button";
import Form from "@/components/form";
import { useSocket } from "@/hooks/useSocket"
import { useState, useEffect } from "react";

  export default function UserRanking(){
    const [inputNombre, setInputNombre] = useState("")
    const {socket,isConnected}=useSocket();


    useEffect(()=>{
      //para evitar errores si no existe el socket
        if (!socket) return;
      socket.on(`pingAll`, (data)=>{
        console.log("llego el evento pingaAll", data)
        
      });

      socket.on('newMessage', (data)=>{
        console.log("Message: ", data)
      });

    },[socket,isConnected]);



    function handleClick(){
      socket.emit("pingAll",{message:"Hola"})
    }

    function sendMessage(){
      socket.emit("sendMessage",{message:inputNombre})
    }

    return(
      <>        
        <h1>Soy la ruta /login/menu</h1>
        <Button onClick={handleClick} text="enviar piongAll"></Button>
        <Form handleChange={(e) => setInputNombre(e.target.value)}/>        
        <Button onClick={sendMessage} text="enviar mensaje"></Button>
        <Button onClick={()=>socket.emit("joinRoom",{room: "Nombre de la sala"})} text="nombre de la sala"></Button>
      </>

    )
  }
  */
