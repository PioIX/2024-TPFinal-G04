"use client"

import { useSocket } from "@/hooks/useSocket"
import { useState, useEffect } from "react";

/*
useEffect(() => {
    fetch('/api/profile-data', 
         {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  */ 

  /*
    const data = {
        user: document.getElementById("username").value,
        password: document.getElementById("password").value,     
    }

    useEffect(() => {
    fetch('/api/profile-data', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])


   */


  //use web socket

  export default function UserRanking(){
    const {socket,isConnected}=useSocket();
    useEffect(()=>{
    },[socket,isConnected]);

    return(
        <h1>Soy la ruta /login/menu</h1>
    )
  }