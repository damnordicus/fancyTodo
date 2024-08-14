import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './AddItem.css';


function AddItem({adminView, userId, setNewTaskVisible, fetchData}) {
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        try{
            const getUsers = async () => {
                const response = await fetch('http://localhost:8080/users')
                const data = await response.json();
                console.log(data);
                setUserList(data);
            }
            getUsers();
        }catch(error){
            console.error(error);
        }
    }, [])

    const handleSubmit = async () => {
        const taskName = document.getElementById("taskName").value;
        const group = document.getElementById("group").value;
        let user = -1;
        if(taskName === ""){
            alert("Please enter a task name!");
            return
        }

        if(selectedUser){
            user = selectedUser;
        }

        try{
            const newTask = await fetch(`http://localhost:8080/tasks/creator/${userId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: taskName,
                    creator_id: user,
                    group_id: group,
                })
            });
            const data = await newTask.json();

        }catch(error){
            console.error(error);
        }
        setNewTaskVisible(false);
        fetchData();
    }
    const handleUserSelect = () => {
        const selectedUser = document.getElementById('userSelect').value;
        if(selectedUser){
           setSelectedUser(selectedUser);
        }
    }

    return(
        <div id="addTaskBlock">
            <h3>Create New Task</h3>
            <p>Task: </p>
            <input type="text" id="taskName"></input>
            <p>Group: </p>
            <input type="text" id="group"></input>
            {adminView? (
                <>
                <p>Assign to: </p>
                <select onChange={handleUserSelect} id="userSelect">
                    <option value={null}> </option>
                    {userList.length? userList.map((x) => <option key={x.id} value={x.id}>{x.username}</option>):null}
                </select>
                </>
            ):null}
            <button type="submit" onClick={handleSubmit}>Add</button>
        </div>
    );
}

export default AddItem;
