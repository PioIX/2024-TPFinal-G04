"use client"
import styles from "./page.module.css"
import Button from "@/components/button"
import { useState, useEffect } from "react";
import Input from "@/components/form";
import Form from "@/components/form";


export default function inicio() {
    const [users, setUsers] = useState("")
    useEffect(() => {
        // Añadir clase al <html> cuando se monte el componente
        traerJugador()

        document.documentElement.classList.add(styles.all);
    }, []);

    useEffect(() => {
        completeRanking()
    }, [users]);


    function rankingComplete() {

        if (getContent() == "") {
            completeRanking()
        } else {
            searchName()
        }
    }
    function orderRanking(array) {
        let x
        x = [].concat(array)
        x = x.sort((a, b) => b.seconds - a.seconds)
        return x
    }

    function searchName() {
        var topPosition = 0
        var innerhtml = ``
        let a = orderRanking(users)
        for (let i = 0; i < a.length; i++) {
            if (a[i].user.toLowerCase().startsWith(getContent().toLowerCase())) {
                topPosition++

                innerhtml += `
                        <h3 class="name">${topPosition} ${a[i].username1}</h3>
                        <h3 class="name"> ${a[i].username2}</h3>
                        <h3 class="point">${a[i].time}</h3>
                        <br>`

            }
        }
        document.getElementById("rank").innerHTML = innerhtml
    }

    async function traerJugador() {
        const response = await fetch('http://localhost:3001/traerJugador', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json()
        setUsers(await result)
        return result
    }

    function completeRanking(){
      
        var innerhtml=``
        let a=orderRanking(users)
        if (a.length>5) {
            for (let i = 0; i < 5; i++) {
                
                    innerhtml+=`
                    <br>
                    <div id="rankingwin"> 
                    <h3 class="name">${topPosition} ${a[i].username1}</h3>
                    <h3 class="name"> ${a[i].username2}</h3>
                    <h3 class="point">${a[i].time}</h3>
                        <br>
                    </div>
                    <br>`
                
                
                
            }
        }else{
            for (let i = 0; i < a.length; i++) {
               
                    innerhtml+=`
                    <h3 class="name">${i} ${a[i].username1}</h3>
                        <h3 class="name"> ${a[i].username2}</h3>
                        <h3 class="point">${a[i].time}</h3>
                        <br>`
                
            }
        }
        
        document.getElementById("rank").innerHTML =innerhtml
    }
    return (

        <div className={styles.todo}>
            <div className={styles.inicio}>
                <div className={styles.ranking}>
                    <h1>Ranking</h1>
                    <h2>Buscar usuario:</h2>
                    <input placeholder="Nombre" className="form-control" type="text" id="searchByContent" onKeyUp={rankingComplete} ></input>
                    <a href="./menu" className={styles.a}>Menu</a><br></br>
                    <div id="rank">

                    </div>
                </div>
            </div>
        </div>

    )
}

