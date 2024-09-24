"use client"
import Form from "@/components/form"
import styles from "./page.module.css"
import Button from "@/components/button"
import { useState } from "react";

export default function inicio() {
    const [inputNombre, setInputNombre] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [userID, setUserId] = useState(0)

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

    return (
        <div className={styles.todo}>
            <div className={styles.inicio}>
                <br></br>
                <p className={styles.texto}>Nombre de usuario</p>
                <Form className={styles.usuario} handleChange={(e) => setInputNombre(e.target.value)}/> 
                <br></br>
                <p className={styles.texto}>Contraseña</p>
                <Form className={styles.usuario}handleChange={(e) => setInputPassword(e.target.value)}/>
                <br></br>
                <Button text="JUGAR" variant="jugar" className={styles.buttonJugar} onClick={ingresarUsuario}></Button>
                <br></br><a href="./registro" className={styles.a}>¿Todavia no te haz registrado?</a>
            </div>
        </div>
    )
}

      /*<main className={styles.main}>
      function spacepress(event) {
        for(var i=0; i<event.target.value.length;i++ ){
          var hola= String(event.target.value)
          if (hola[i]==" "){
            hola = hola.substring(0, hola.length - 1);
            event.target.value=hola
          }
          
        }
        return
      }
      <div id="logindiv">
      <h1>Preguntados</h1>
      <br></br>
      <label id="usernamecss" for="username">Nombre de usuario (No mas de 10 caracteres):</label>
      <Input onkeypress={spacepress} placeholder="Nombre" type="text" id="username" maxlength="10" ></Input>
      <br></br>
      <label id="passwordcss" for="password">Contraseña (No mas de 10 caracteres):</label>
            <Input onkeypress={spacepress} placeholder="Contraseña" type="text" id="password" maxlength="10" ></Input>
            <br></br>
            
        </div>
        <div id="loginbuttons">
            <Button id="ingresar" type="button" onclick={login}>Ingresar</Button>
            <Button id="registrarse" type="button" onclick={register}>Registrarse</Button>
            
        </div>
    </main>
    
  );
}
*/