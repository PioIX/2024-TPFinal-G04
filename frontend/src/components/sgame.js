"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Sgame.module.css"
import { useSocket } from "@/hooks/useSocket";


function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getRandoms() {
	var positions = [];
	var number = 1;

	for (let index = 0; index < 5; index++) {
		number = getRandomInt(0, 49);
		do {
			number = getRandomInt(0, 49);
		} while (positions.includes(number));
		positions.push(number)

	}
	return positions
}


export default function Naval(props) {


	let [position, setPosition] = useState([]);
	let [bombs, setBombs] = useState([]);
	let started = false;
    const {socket,isConnected}=useSocket();

	useEffect(() => {
		setPosition(getRandoms());
	}, [])


	useEffect(() => {
		localStorage.setItem("misBombas", position);
        if (!socket) return;
		socket.on('newBombas', (data)=>{
            if (data.message.position != localStorage.getItem("misBombas")) { 
                localStorage.setItem("susBombas", data.message.position);
            }
          });

        if (!started) {
            socket.emit("joinRoom",{room: "Kaboom"})
            socket.emit("bombas",{position: position})
            started=true
        }
    }, [socket, isConnected])

	const manejarClick = (e) => {
		// `e.target` es el elemento que fue clicado
		var secuence=[]
		var num=""
        for (let index = 0; index < localStorage.getItem("susBombas").length; index++) {
            if (localStorage.getItem("susBombas")[index]!=",") {
                num+=localStorage.getItem("susBombas")[index]
				if (index==localStorage.getItem("susBombas").length-1) {
					secuence.push(parseInt(num))
				}
            }else{
				secuence.push(parseInt(num))
				num=""
			}
        }
		//e.target.setAttribute('class', 'Sgame_selected__hF5Ep')//Sgame_td__fzQJ2
		if (secuence.includes(Number(e.target.id)) && bombs.includes(e.target.id) == false && localStorage.getItem("misBombas").includes(Number(e.target.id))){
			e.target.setAttribute('class', 'Sgame_pointselected__U2gv6')//Sgame_td__fzQJ2
			var a = bombs
			a.push(e.target.id)
			setBombs(a)
			if (bombs.length == 5) {
				console.log("ganaste")
			}
		}else if (secuence.includes(Number(e.target.id)) && bombs.includes(e.target.id) == false && localStorage.getItem("misBombas").includes(Number(e.target.id))==false){
			e.target.setAttribute('class', 'Sgame_point__8L8s3')//Sgame_td__fzQJ2
			var a = bombs
			a.push(e.target.id)
			setBombs(a)
			if (bombs.length == 5) {
				console.log("ganaste")
			}
		} else if (secuence.includes(Number(e.target.id)) && bombs.includes(e.target.id)) {

		} else if (secuence.includes(Number(e.target.id))==false && bombs.length < 5){
			console.log("error")
		}
	};

	function manejarHover(e) {
		for (let index = 0; index < 5; index++) {
			if (document.getElementById(position[index]).getAttribute('class') != "Sgame_pointselected__U2gv6")
				document.getElementById(position[index]).setAttribute('class', 'Sgame_selected__hF5Ep')
		}
	}

	return (
		<div id="board">
			<div id="messageArea" className={styles.all}>
				<table  className={styles.todo}>
					<tbody className={styles.fondo}>
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

