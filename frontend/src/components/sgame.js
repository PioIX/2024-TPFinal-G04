"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Sgame.module.css"


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export default function Naval(props) {


	let[position,setPosition]= useState([]);

	useEffect(()=>{
        setPosition([getRandomInt(1,10)])
        
    },[])

	const manejarClick = (e) => {
		// `e.target` es el elemento que fue clicado
		const elementoClicado = e.target;
		const idElemento = elementoClicado.getAttribute('id');
		document.getElementById(idElemento).setAttribute('class', 'Sgame_selected__hF5Ep')//Sgame_td__fzQJ2

	  };
    
    return(
    <div id="board">
		<div id="messageArea">
		<table >
		<tbody>
			<tr>
				
				<td className={styles.td} onClick={manejarClick} id="0"></td>
				<td className={styles.td} onClick={manejarClick} id="1"></td>
				<td className={styles.td} onClick={manejarClick} id="2"></td>
				<td className={styles.td} onClick={manejarClick} id="3"></td>
				<td className={styles.td} onClick={manejarClick} id="4"></td>
				<td className={styles.td} onClick={manejarClick} id="5"></td>
				<td className={styles.td} onClick={manejarClick} id="6"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} id="7"></td>
				<td className={styles.td} onClick={manejarClick} id="8"></td>
				<td className={styles.td} onClick={manejarClick} id="9"></td>
				<td className={styles.td} onClick={manejarClick} id="10"></td>
				<td className={styles.td} onClick={manejarClick} id="11"></td>
				<td className={styles.td} onClick={manejarClick} id="12"></td>
				<td className={styles.td} onClick={manejarClick} id="13"></td>
            </tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} id="14"></td>
				<td className={styles.td} onClick={manejarClick} id="15"></td>
				<td className={styles.td} onClick={manejarClick} id="16"></td>
				<td className={styles.td} onClick={manejarClick} id="17"></td>
				<td className={styles.td} onClick={manejarClick} id="18"></td>
				<td className={styles.td} onClick={manejarClick} id="19"></td>
				<td className={styles.td} onClick={manejarClick} id="20"></td>
			</tr>
				
			<tr>
				<td className={styles.td} onClick={manejarClick} id="21"></td>
				<td className={styles.td} onClick={manejarClick} id="22"></td>
				<td className={styles.td} onClick={manejarClick} id="23"></td>
				<td className={styles.td} onClick={manejarClick} id="24"></td>
				<td className={styles.td} onClick={manejarClick} id="25"></td>
				<td className={styles.td} onClick={manejarClick} id="26"></td>
				<td className={styles.td} onClick={manejarClick} id="27"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} id="28"></td>
				<td className={styles.td} onClick={manejarClick} id="29"></td>
				<td className={styles.td} onClick={manejarClick} id="30"></td>
				<td className={styles.td} onClick={manejarClick} id="31"></td>
				<td className={styles.td} onClick={manejarClick} id="32"></td>
				<td className={styles.td} onClick={manejarClick} id="33"></td>
				<td className={styles.td} onClick={manejarClick} id="34"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} id="35"></td>
				<td className={styles.td} onClick={manejarClick} id="36"></td>
				<td className={styles.td} onClick={manejarClick} id="37"></td>
				<td className={styles.td} onClick={manejarClick} id="38"></td>
				<td className={styles.td} onClick={manejarClick} id="39"></td>
				<td className={styles.td} onClick={manejarClick} id="40"></td>
				<td className={styles.td} onClick={manejarClick} id="41"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} id="42"></td>
				<td className={styles.td} onClick={manejarClick} id="43"></td>
				<td className={styles.td} onClick={manejarClick} id="44"></td>
				<td className={styles.td} onClick={manejarClick} id="45"></td>
				<td className={styles.td} onClick={manejarClick} id="46"></td>
				<td className={styles.td} onClick={manejarClick} id="47"></td>
				<td className={styles.td} onClick={manejarClick} id="48"></td>
			</tr>
            </tbody>
		</table>
		</div>
	</div>)

}

