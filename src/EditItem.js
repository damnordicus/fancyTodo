import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './EditItem.css';


function EditItem({id, value, setShowEdit, fetchData, handleUpdate}) {

    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        try{
            const updateData = async () => {
                const response = await fetch(`http://localhost:8080/tasks/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        value: inputValue,
                    })
                });
                const data = await response.json();
                if(data){
                    console.log("Success")
                    fetchData();
                    //handleUpdate();
                }else{
                    console.log("error")
                }
            }
            updateData();
        }catch(error){
            console.error(error);
        }
    }
    const handleCancel = () => {
       setShowEdit(false);
       fetchData();
       //handleUpdate();
    }

    return(
        <div id="editBlock">
            <input id="title" type="text" defaultValue={value} onChange={(e) => {setInputValue(e.target.value)}}></input>
            <div id="buttons">
                <button type="submit" onClick={handleClick}>Update</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default EditItem;
