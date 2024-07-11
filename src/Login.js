import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './Login.css';
import NewUser from './NewUser';

function Login({setUserLoggedIn}) {
    const [newUserPage, setNewUserPage] = useState(false);

    const handleSubmnit = async () => {
        const userInput = document.getElementById("userInput").value;
        const passInput = document.getElementById("passInput").value;
       
        try{
            const user = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userInput,
                    password: passInput
                })
            });
            const response = await user.json();
            setUserLoggedIn(response);
        }catch(error){
            console.error(error);
        }
    }

    const register = () => {
        setNewUserPage(!newUserPage);
        console.log("test");
    }

    return (
        <div id="LoginBlock">
            {!newUserPage ? (
                <>
                <h2>Login</h2>
                <div id="userInputDiv">
                    <label for="userInput">Username: </label>
                    <input id="userInput" name="userInput" type="text" />
                </div>
                <div id="passInputDiv">
                    <label for="passInput">Password: </label>
                    <input id="passInput" name="passInput" type="password" />
                </div>
                <div id="buttons">
                    <button id="makeNewButton" type="button" onClick={register}>Create New Account</button>
                    <button id="submitButton" type='submit' onClick={handleSubmnit}>Submit</button>
                </div>
                </>):<NewUser register={register} />}
        </div>
    )
}

export default Login;