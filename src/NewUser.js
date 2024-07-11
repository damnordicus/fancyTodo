import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './NewUser.css';

function NewUser({register}) {

    const handleSubmnit = async () => {
        const userInput = document.getElementById("userInput").value;
        const passInput = document.getElementById("passInput").value;
        const admin = document.getElementById("isAdmin").checked;
       
        try{
            const checkUser = await fetch("http://localhost:8080/users")
            const data = await checkUser.json();
            for(let i = 0; i < data.length; i++){
                if(data[i].username === userInput){
                    alert("Username already taken.");
                    return;
                }
            }

            const user = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userInput,
                    password: passInput,
                    is_admin: admin,
                })
            });
            await user.json();
            
                console.log("testttt")
                await register();
            
            //window.location.reload();
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div id="newUser">
            <h2 id="cH">Create New Account</h2>
            <label for="userInput">Username: </label>
            <input id="userInput" name="userInput" type="text" />
            <label for="passInput">Password: </label>
            <input id="passInput" name="passInput" type="password" />
            <div><label for="adminCheck">Administrator: </label>
            <input name="adminCheck" id="isAdmin" type="checkbox"/></div>
            <button type='submit' onClick={handleSubmnit}>Submit</button>
        </div>
    )
}

export default NewUser;