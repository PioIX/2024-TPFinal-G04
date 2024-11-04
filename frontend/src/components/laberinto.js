"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";
import styles from "./Laberinto.module.css"
import { useSocket } from "@/hooks/useSocket";
import Image from "./image";
import Persona from "./personita";



function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Laberinto(props) {
    var [position, setPosition] = useState([[0,1,2,9,16,17,18,25,32,33,40,41],[0,7,14,15,16,9,10,11,18,25,32,31,30,37,44],[39,40,33,26,19,12,11,10,17,24,23,30,37,44,43,42,35,28,21,14,15,8,1],[36,43,44,45,46,39,32,33,34,27,20,19,18,17,10,3,2,1,8],[19,18,11,4,3,2,9,16,23,30,31,32,33,40,47,46,45,44,43,42,35,28,21],[48,47,46,39,32,31,30,29,28,21,14,7,0,1,2,3,4,5,12,19,18,17,16],[6,13,20,19,18,11,4,3,2,1,8,15,16,23,30,29,36,43,44,45,38,39,32,33,34,41,48,47],[2,3,4,5,12,19,18,17,16,15,22,29,36,43,44,45,46,47,48,41,34,33],[36,43,44,45,46,39,40,41,34,27,20,19,18,25,24,23,22,15,8,1,2,3,10],[26,19,12,5,4,3,10,17,16,15,14,21,28,35,42,43,44,45,46,39,32,31,30],[44,43,42,35,28,29,30,23,16,9,2,3,4,11,18,25,32,33,40,47,46],[37,44,43,42,35,28,21,22,23,24,31,32,33,26,19,12,5,4,3,10,9,8,7],[43,44,37,30,29,22,15,8,1,2,3,10,17,24,25,26,27,34,41,40,39],[8,1,2,3,4,11,12,13,20,27,34,41,40,39,32,25,24,23,22,29,36,37],[0,1,2,3,4,5,12,19,18,17,16,15,14,21,28,29,30,31,32,33,40,47,46,45,44,43,42]]);
    var [random, setRandom] = useState(getRandomInt(0, position.length))
	var [lab,setLab]= useState()
	var [player,setPlayer]=useState()
    const { socket, isConnected } = useSocket();
    let started = false;
	
	
    useEffect(() => {
        if (localStorage.getItem("userId") == 1) {
            localStorage.setItem("miLaberinto", position[random]);
        }
        if (!socket) return;
        if (localStorage.getItem("userId") == 2) {
            socket.on('newLaberinto', (data) => {
                if (data.message.numero != localStorage.getItem("miLaberinto")) {
                    localStorage.setItem("miLaberinto", data.message.numero);
                }
            });
			laberinto()
        }

        socket.on('newLabwin', (data) => {
            if (data.message.numero == "win") {
                console.log("ganaste")
            }else{
				console.log("perdiste")
			}

        });

        if (!started) {
            socket.emit("joinRoom", { room: "Kaboom" })
            if (localStorage.getItem("userId") == 1) {
                socket.emit("laberinto", { numero: position[random] })
            }
            started = true
        }
    }, [socket, isConnected])

	function paintWall(Array) {
		if (localStorage.getItem("userId") == 1) {
			for (let index = 0; index < Array.length+1; index++) {
				if (document.getElementById("l"+Array[index])!=undefined) {
					document.getElementById("l"+Array[index]).setAttribute('class', 'Laberinto_wall__c2U4E')
				}
			}
		}else{
			for (let index = 0; index < Array.length; index++) {
				if (document.getElementById("ls"+Array[index])!=undefined) {
					if (Array[index]==Array[0]) {
						//'<img className={styles.img} height=21 src="/laberinto/corazon.png"/>'
						//<Image className={styles.img} src={"/laberinto/corazon.png"} height={21} ></Image>
						document.getElementById("ls"+Array[index]).innerHTML='<img className={styles.img} height=18 src="/laberinto/corazon.png"/>'
					}
					if (Array[index]==Array[Array.length-1]) {
						document.getElementById("ls"+Array[index]).innerHTML='<img className={styles.img} height=18 src="/laberinto/bandera.png"/>'
					}
				}
			}
		}
		
	}
//if (document.getElementById(position[0][index]).getAttribute('class') != "Laberinto_wall__c2U4E")
	function derecha(){
		if (lab.includes(player+1)) {
			document.getElementById("ls"+player).innerHTML=""
			document.getElementById("ls"+String(player+1)).innerHTML='<img className={styles.img} height=18 src="/laberinto/corazon.png"/>'
			setPlayer(player+1)
		}else{
			socket.emit("labwin", { numero: "perdiste" })
		}
		if (player+1==lab[lab.length-1]) {
			socket.emit("labwin", { numero: "win" })
			document.getElementById("izquierdal").disabled=true
			document.getElementById("derechal").disabled=true
			document.getElementById("arribal").disabled=true
			document.getElementById("abajol").disabled=true
		}
	}
	function izquierda(){
		if (lab.includes(player-1)) {
			document.getElementById("ls"+player).innerHTML=""
			document.getElementById("ls"+String(player-1)).innerHTML='<img className={styles.img} height=18  src="/laberinto/corazon.png"/>'
			setPlayer(player-1)
		}else{
			socket.emit("labwin", { numero: "perdiste" })
		}
		if (player-1==lab[lab.length-1]) {
			socket.emit("labwin", { numero: "win" })
			document.getElementById("izquierdal").disabled=true
			document.getElementById("derechal").disabled=true
			document.getElementById("arribal").disabled=true
			document.getElementById("abajol").disabled=true
		}
	}
	function arriba(){
		if (lab.includes(player-7)) {
			document.getElementById("ls"+player).innerHTML=""
			document.getElementById("ls"+String(player-7)).innerHTML='<img className={styles.img} height=18 src="/laberinto/corazon.png"/>'
			setPlayer(player-7)
		}else{
			socket.emit("labwin", { numero: "perdiste" })
		}
		if (player-7==lab[lab.length-1]) {
			socket.emit("labwin", { numero: "win" })
			document.getElementById("izquierdal").disabled=true
			document.getElementById("derechal").disabled=true
			document.getElementById("arribal").disabled=true
			document.getElementById("abajol").disabled=true
		}
	}
	function abajo(){
		if (lab.includes(player+7)) {
			document.getElementById("ls"+player).innerHTML=""
			document.getElementById("ls"+String(player+7)).innerHTML='<img className={styles.img} height=21 src="/laberinto/corazon.png"/>'
			setPlayer(player+7)
		}else{
			socket.emit("labwin", { numero: "perdiste" })
		}
		if (player+7==lab[lab.length-1]) {
			socket.emit("labwin", { numero: "win" })
			document.getElementById("izquierdal").disabled=true
			document.getElementById("derechal").disabled=true
			document.getElementById("arribal").disabled=true
			document.getElementById("abajol").disabled=true
		}
	}

	async function laberinto() {
		var secuence=[]
		var num=""
        for (let index = 0; index < localStorage.getItem("miLaberinto").length; index++) {
            if (localStorage.getItem("miLaberinto")[index]!=",") {
                num+=localStorage.getItem("miLaberinto")[index]
				if (index==localStorage.getItem("miLaberinto").length-1) {
					secuence.push(parseInt(num))
				}
            }else{
				secuence.push(parseInt(num))
				num=""
			}
        }
		setPlayer(secuence[0])
		setLab(secuence)
		paintWall(secuence) 
	}

	useEffect(() => {
		if (localStorage.getItem("userId") == 1) {
			
			laberinto()
		}
    }, [])
	if (localStorage.getItem("userId") == 1) {
		
		return(
			<div id="board">
				<div id="messageArea" className={styles.all}>
					<table className={styles.todo}>
						<tbody className={styles.fondo}>
							<tr>
								
	
								<td className={styles.td} id="l0"></td>
								<td className={styles.td} id="l1"></td>
								<td className={styles.td} id="l2"></td>
								<td className={styles.td} id="l3"></td>
								<td className={styles.td} id="l4"></td>
								<td className={styles.td} id="l5"></td>
								<td className={styles.td} id="l6"></td>
							</tr>
							<tr>
								<td className={styles.td} id="l7"></td>
								<td className={styles.td} id="l8"></td>
								<td className={styles.td} id="l9"></td>
								<td className={styles.td} id="l10"></td>
								<td className={styles.td} id="l11"></td>
								<td className={styles.td} id="l12"></td>
								<td className={styles.td} id="l13"></td>
							</tr>
							<tr>
								<td className={styles.td} id="l14"></td>
								<td className={styles.td} id="l15"></td>
								<td className={styles.td} id="l16"></td>
								<td className={styles.td} id="l17"></td>
								<td className={styles.td} id="l18"></td>
								<td className={styles.td} id="l19"></td>
								<td className={styles.td} id="l20"></td>
							</tr>
	
							<tr>
								<td className={styles.td} id="l21"></td>
								<td className={styles.td} id="l22"></td>
								<td className={styles.td} id="l23"></td>
								<td className={styles.td} id="l24"></td>
								<td className={styles.td} id="l25"></td>
								<td className={styles.td} id="l26"></td>
								<td className={styles.td} id="l27"></td>
							</tr>
							<tr>
								<td className={styles.td} id="l28"></td>
								<td className={styles.td} id="l29"></td>
								<td className={styles.td} id="l30"></td>
								<td className={styles.td} id="l31"></td>
								<td className={styles.td} id="l32"></td>
								<td className={styles.td} id="l33"></td>
								<td className={styles.td} id="l34"></td>
							</tr>
							<tr>
								<td className={styles.td} id="l35"></td>
								<td className={styles.td} id="l36"></td>
								<td className={styles.td} id="l37"></td>
								<td className={styles.td} id="l38"></td>
								<td className={styles.td} id="l39"></td>
								<td className={styles.td} id="l40"></td>
								<td className={styles.td} id="l41"></td>
							</tr>
							<tr>
								<td className={styles.td} id="l42"></td>
								<td className={styles.td} id="l43"></td>
								<td className={styles.td} id="l44"></td>
								<td className={styles.td} id="l45"></td>
								<td className={styles.td} id="l46"></td>
								<td className={styles.td} id="l47"></td>
								<td className={styles.td} id="l48"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
	if (localStorage.getItem("userId") == 2) {
		
		return(
			<div id="board">
				<Button className={styles.derecha} id="derechal" onClick={derecha} text="►"></Button>
				<Button className={styles.izquierda} id="izquierdal" onClick={izquierda} text="◄"></Button>
				<Button className={styles.arriba} id="arribal" onClick={arriba} text="▲"></Button>
				<Button className={styles.abajo} id="abajol" onClick={abajo} text="▼"></Button>
				<div className={styles.all} id="messageArea">
					<table className={styles.todo2} >
						<tbody className={styles.fondo2}>
							<tr>
							
								<td className={styles.td2} id="ls0"></td>
								<td className={styles.td2} id="ls1"></td>
								<td className={styles.td2} id="ls2"></td>
								<td className={styles.td2} id="ls3"></td>
								<td className={styles.td2} id="ls4"></td>
								<td className={styles.td2} id="ls5"></td>
								<td className={styles.td2} id="ls6"></td>
							</tr>
							<tr>
								<td className={styles.td2} id="ls7"></td>
								<td className={styles.td2} id="ls8"></td>
								<td className={styles.td2} id="ls9"></td>
								<td className={styles.td2} id="ls10"></td>
								<td className={styles.td2} id="ls11"></td>
								<td className={styles.td2} id="ls12"></td>
								<td className={styles.td2} id="ls13"></td>
							</tr>
							<tr>
								<td className={styles.td2} id="ls14"></td>
								<td className={styles.td2} id="ls15"></td>
								<td className={styles.td2} id="ls16"></td>
								<td className={styles.td2} id="ls17"></td>
								<td className={styles.td2} id="ls18"></td>
								<td className={styles.td2} id="ls19"></td>
								<td className={styles.td2} id="ls20"></td>
							</tr>
	
							<tr>
								<td className={styles.td2} id="ls21"></td>
								<td className={styles.td2} id="ls22"></td>
								<td className={styles.td2} id="ls23"></td>
								<td className={styles.td2} id="ls24"></td>
								<td className={styles.td2} id="ls25"></td>
								<td className={styles.td2} id="ls26"></td>
								<td className={styles.td2} id="ls27"></td>
							</tr>
							<tr>
								<td className={styles.td2} id="ls28"></td>
								<td className={styles.td2} id="ls29"></td>
								<td className={styles.td2} id="ls30"></td>
								<td className={styles.td2} id="ls31"></td>
								<td className={styles.td2} id="ls32"></td>
								<td className={styles.td2} id="ls33"></td>
								<td className={styles.td2} id="ls34"></td>
							</tr>
							<tr>
								<td className={styles.td2} id="ls35"></td>
								<td className={styles.td2} id="ls36"></td>
								<td className={styles.td2} id="ls37"></td>
								<td className={styles.td2} id="ls38"></td>
								<td className={styles.td2} id="ls39"></td>
								<td className={styles.td2} id="ls40"></td>
								<td className={styles.td2} id="ls41"></td>
							</tr>
							<tr>
								<td className={styles.td2} id="ls42"></td>
								<td className={styles.td2} id="ls43"></td>
								<td className={styles.td2} id="ls44"></td>
								<td className={styles.td2} id="ls45"></td>
								<td className={styles.td2} id="ls46"></td>
								<td className={styles.td2} id="ls47"></td>
								<td className={styles.td2} id="ls48"></td>
								
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}