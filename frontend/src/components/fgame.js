"use client"
import Button from "@/components/button";
import { useState, useEffect } from "react";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export default function Numbers(props) {
    let[num1,setNum1]= useState(0);
    let[num2,setNum2]= useState(0);
    let[number1,setNumber1]= useState(0);
    let[number2,setNumber2]= useState(0);
    let[number3,setNumber3]= useState(0);
    let[total,setTotal]= useState(0);
    let[total2,setTotal2]= useState(0);
    let[text,setText]= useState("");

    function resta1(){
        if(num1!=0){
            setNum1(num1-=1)
        }else{
            setNum1(9)
        }
    }

    function resta2(){
        if(num2!=0){
            setNum2(num2-=1)
        }else{
            setNum2(9)
        }
    }

    function suma1(){
        if(num1!=9){
            setNum1(num1+=1)
        }else{
            setNum1(0)
        }
    }


    
    function suma2(){
        if(num2!=9){
            setNum2(num2+=1)
        }else{
            setNum2(0) 
        }
    }    

    function check(){
        let auxtotal = String(num1)+String(num2)
        let auxtotal2 = (number2*number3)+number1
        setTotal(auxtotal)  
        setTotal2(auxtotal2)
        if (auxtotal==auxtotal2) {
            setText("bien")
        }else{
            setText("mal")
        }
    }

    

    useEffect(()=>{
        setNumber1(getRandomInt(1,10))
        setNumber2(getRandomInt(1,10))
        setNumber3(getRandomInt(1,10))
        
    },[])
    
    return(
        <div>
            {number1 !=0 && <h1>{number1}+{number2}*{number3}</h1>}
            <Button onClick={suma1} text="+" />
            <Button onClick={resta1} text="-" />
            <h1>{num1}</h1>
            <Button onClick={suma2} text="+" />
            <Button onClick={resta2} text="-" />
            <h1>{num2}</h1>
            <Button onClick={check} text="Check" />
            <h1>{text}</h1>
            <h1>{total}</h1>
            <h1>{total2}</h1>
        </div>
    )
}