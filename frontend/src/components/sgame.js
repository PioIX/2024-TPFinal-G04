"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Sgame.module.css"


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

function getRandoms(){
	var positions = [];
	var number = 1;

	for (let index = 0; index < 5; index++) {
		number = getRandomInt(0,49);
		do {
			number = getRandomInt(0,49);
		} while (positions.includes(number));
		positions.push(number)

	}
	return positions
}

export default function Naval(props) {


	let [position,setPosition]= useState([]);

	useEffect(()=>{
		setPosition(getRandoms());
	},[])

	const manejarClick = (e) => {
		// `e.target` es el elemento que fue clicado
		//e.target.setAttribute('class', 'Sgame_selected__hF5Ep')//Sgame_td__fzQJ2
		if (position.includes(Number(e.target.id))) {
			e.target.setAttribute('class', 'Sgame_pointselected__U2gv6')//Sgame_td__fzQJ2
		}else{
			e.target.setAttribute('class', 'Sgame_point__8L8s3')//Sgame_td__fzQJ2
		}
	  };

	function manejarHover(e) {
		for (let index = 0; index < 5; index++) {
			if(document.getElementById(position[index]).getAttribute('class')!="Sgame_pointselected__U2gv6")
				document.getElementById(position[index]).setAttribute('class', 'Sgame_selected__hF5Ep')
		}
	}
    
    return(
    <div id="board">
		<div id="messageArea">
		<table >
		<tbody>
			<tr>
				
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="0"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="1"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="2"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="3"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="4"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="5"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="6"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="7"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="8"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="9"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="10"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="11"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="12"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="13"></td>
            </tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="14"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="15"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="16"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="17"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="18"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="19"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="20"></td>
			</tr>
				
			<tr>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="21"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="22"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="23"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="24"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="25"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="26"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="27"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="28"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="29"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="30"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="31"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="32"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="33"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="34"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="35"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="36"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="37"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="38"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="39"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="40"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="41"></td>
			</tr>
			<tr>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="42"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="43"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="44"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="45"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="46"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="47"></td>
				<td className={styles.td} onClick={manejarClick} onMouseEnter={manejarHover} id="48"></td>
			</tr>
            </tbody>
		</table>
		</div>
	</div>)

}

