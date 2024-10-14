"use client"
import styles from "./page.module.css"
import Button from "@/components/button"
import { useState } from "react";
import Input from "@/components/form";
import Form from "@/components/form";


export default function inicio() {
    const [inputNombre, setInputNombre] = useState("")
    const [inputPuntaje, setInputPuntaje] = useState("")
    const [userID, setUserId] = useState(0)

    async function ingresarUsuario() {
        if (await existeUsuario() == true) {
            console.log("existe")
            location.href ="login/menu"
        } else {
            alert("el usuario no existe o la contraseña no es correcta");
        }
    }

    async function existeUsuario() {
        const data = {
            nombre_usuario: inputNombre,
            contraseña: inputPassword,
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
        <body>
        <div className={styles.todo}>
            <div className={styles.inicio}>
                <div className={styles.ranking}>
                <h1>Ranking</h1>
                <h2>Buscar usuario:</h2>
                <Form className={styles.ranking} handleChange={(e) => setInputPassword(e.target.value)}/>
            </div>
        </div>
        </div>
        </body>
        </html>
    )
}

 