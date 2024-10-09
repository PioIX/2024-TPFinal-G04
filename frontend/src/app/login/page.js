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
            console.log("Haz ingresado")
            location.href ="login/menu"
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
        <html className={styles.all}>
        < link rel="page.module.css" href="https://fonts.google.com/specimen/Chakra+Petch?lang=en_Latn"></link>
        <body >
        <div className={styles.todo}>
            <div className={styles.inicio}>
                <br></br>
                <p className={styles.texto}>Nombre de usuario</p>
                <Form className={styles.usuario} handleChange={(e) => setInputNombre(e.target.value)}/> 
                <br></br>
                <p className={styles.texto}>Contraseña</p>
                <Form className={styles.usuario} handleChange={(e) => setInputPassword(e.target.value)}/>
                <br></br>
                <Button text="JUGAR" variant="jugar" className={styles.buttonJugar} onClick={ingresarUsuario}></Button>
                <br></br><a href="./registro" className={styles.a}>¿Todavia no te haz registrado?</a>
            </div>
        </div>
        </body>
        </html>
    )
}

 