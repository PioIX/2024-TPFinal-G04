import clsx from "clsx"
import { useEffect } from "react";
import { useState } from "react";
export default function Home() {
    const [nombres, setNombres] = useState("")
/*  
    useEffect(()=> {
        fetch('http://localhost:3001/')
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data)
        })
    })
    
    useEffect(()=> {
        fetch('http://localhost:3000/traerJugador', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then(data => setNombres(data))
        
       
    })  

        
    useEffect(()=> {
        const data = {
        user: document.getElementById("username").value, va a ser remplazado con el useState
        password: document.getElementById("password").value,     
        }
        fetch('http://localhost:3000/agregarUsuario', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
    })

    */
  return (
    <main >
      
    </main>
  );
}