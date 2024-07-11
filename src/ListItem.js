import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './ListItem.css';
import EditItem from './EditItem'

function ListItem({id, index, title, creator_id, is_complete, comments, setCurrentItem, fetchData}) {
    const [localComplete, setLocalComplete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        setLocalComplete(is_complete);
    },[])

    const handleToggleComplete = () => {
        const temp = !localComplete;
       setLocalComplete(temp);
       const updateData = async () => {
           try {
               const response = await fetch(`http://localhost:8080/tasks/${id}/checked`, {
                   method: 'PATCH',
                   headers: {
                       "Content-Type": "application/json",
                   },
                   body: JSON.stringify({
                       is_complete: temp,
                   }),
               });

               const data = await response.json();
           } catch (error) {
               console.error('Error updating task: ', error);
           }
       }
       updateData();
    }

    const deleteTask = () => {
        const deleteData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/tasks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    }})
 
                const data = await response.json();
                if(data){
                    fetchData();
                }
            } catch (error) {
                console.error('Error deleting task: ', error);
            }
        }
       deleteData();
    }
    const editTitle = () =>{
        if(localComplete){
            return
        }
        setCurrentItem(id);
        setShowEdit(true);
    }

    const handleUpdate = () => {
        setShowEdit(false);
       // fetchData();
    }

    const viewComments = () => {
        setShowComments(true);
    }
    return(
        <div key={index} id="item">
            <div id="title" onClick={editTitle} style={{ textDecoration: localComplete ? 'line-through' : 'none'}} onMouseOver={() => viewComments}>{showEdit ? <EditItem id={id} value={title} setShowEdit={setShowEdit} fetchData={fetchData} handleUpdate={handleUpdate}/> : title}</div>
            {showComments ? <p>{comments}</p> : null}
        <button id="completeCheck"name="isCompleted" onClick={handleToggleComplete}>{localComplete? <svg xmlns="http://www.w3.org/2000/svg" style={{fill: 'green'}} width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg> : <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fill: "red"}}><path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z"></path></svg>}</button> 
            <button id="deleteButton" name="delete" onClick={deleteTask}><img src={process.env.PUBLIC_URL + './trash.svg'} width="15" /></button>
            <p>{creator_id ? creator_id : null}</p>
        </div>
    );
}

export default ListItem;
