"use client"

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