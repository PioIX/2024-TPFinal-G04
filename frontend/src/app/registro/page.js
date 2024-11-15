"use client"
import Form from "@/components/form"
import styles from "./page.module.css"
import Button from "@/components/button"

import { useState } from "react";

export default function inicio() {
    const [inputNombre, setInputNombre] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    var id_usuario_logueado = 0;

    async function registrarNuevoUsuario() {
        if (inputNombre != "" && inputPassword != "") {
            const data = {
                nombre_usuario: inputNombre,
                contraseña: inputPassword
            }

            const response = await fetch('http://localhost:3001/insertarUsuario', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            console.log(result)

            if (result.status == "Ok") {
                alert("Se ha registrado")
            } else {
                alert("Usuario ya existe")
            }
        }
    }
    return (
        <html className={styles.all}>
            <link rel="page.module.css" href="https://fonts.google.com/specimen/Space+Grotesk?preview.text=papyrus"></link>
            <body>
                <div className={styles.todo}>
                    <div className={styles.inicio}>
                        <br></br>
                        <p className={styles.texto}>Nombre de usuario</p>
                        <Form className={styles.usuario} handleChange={(e) => setInputNombre(e.target.value)} />
                        <br></br>
                        <p className={styles.texto}>Contraseña</p>
                        <Form className={styles.usuario} handleChange={(e) => setInputPassword(e.target.value)} />
                        <br></br>
                        <Button text="REGISTRARSE" variant="jugar" className={styles.buttonJugar} onClick={registrarNuevoUsuario}></Button>
                        <br></br><a href="./login" className={styles.a}>Iniciar Sesión</a>
                    </div>
                </div>
            </body>
        </html>
    )
}