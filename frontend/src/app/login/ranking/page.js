"use client"
import styles from "./page.module.css"
import Button from "@/components/button"
import { useState, useEffect } from "react";
import Input from "@/components/form";
import Form from "@/components/form";


export default function inicio() {
    const [users, setUsers] = useState("")
    const [content, setContent] = useState("")
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
    function getContent() {
        setContent(document.getElementById("searchByContent").value)
        return document.getElementById("searchByContent").value
    }
    function searchName() {
        var topPosition = 0
        var innerhtml = ``
        let a = orderRanking(users)
        for (let i = 0; i < a.length; i++) {
            if (a[i].username1.toLowerCase().startsWith(getContent().toLowerCase()) || a[i].username2.toLowerCase().startsWith(getContent().toLowerCase())) {
                topPosition++
                innerhtml += `
                
                    <div id="rankingwin"> 
                    <h3 className={styles.name}>${topPosition} ${a[i].username1} ${a[i].username2}</h3>
                    <h3 className={styles.point}>${a[i].time}</h3>
                    </div>
                    `

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

    function completeRanking() {
        var topPosition = 0
        var innerhtml = ``
        let a = orderRanking(users)
        if (a.length > 5) {
            for (let i = 0; i < 5; i++) {
                topPosition++
                innerhtml += `
                    
                    <div id="rankingwin"> 
                    <h3 className={styles.name}>${topPosition} ${a[i].username1} ${a[i].username2} </h3>
                    <h3 className={styles.point}>${a[i].time}</h3>
                    
                    </div>
                    `



            }
        } else {
            for (let i = 0; i < a.length; i++) {

                innerhtml += `
                    
                    <div id="rankingwin"> 
                    <h3 className={styles.name}>${i + 1} ${a[i].username1} ${a[i].username2}</h3>
                    <h3 className={styles.point} >${a[i].time}</h3>
                    
                    </div>
                    `

            }
        }

        document.getElementById("rank").innerHTML = innerhtml
    }
    return (

        <div className={styles.todo}>
            <div className={styles.inicio}>


                <input placeholder="Buscar usuario" className={styles.searchByContent} type="text" id="searchByContent" onKeyUp={rankingComplete} ></input>
                <a href="./menu" className={styles.a}>Menu</a><br></br>
                <div id="rank" className={styles.rankingdiv}>

                </div>
            </div>
        </div>

    )
}

