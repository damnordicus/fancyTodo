import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './Board.css';
import Login from './Login';
import ListItem from './ListItem';
import AddItem from './AddItem';

function Board({adminView, userId}) {
    const [taskList, setTaskList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newTaskVisible, setNewTaskVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    //const [showEdit, setShowEdit] = useState(false);
    const fetchData = async() => {
        setIsLoaded(false);
        const url = `http://localhost:8080/tasks${!adminView?`/creator/${userId.id}`:' '}`
        const response = await fetch(url)
        const data = await response.json();
        setTaskList(data);
        setIsLoaded(true); 
    }
    useEffect(() => {
        fetchData();
    },[])

    const addTask = () => {
        setNewTaskVisible(!newTaskVisible);
    }

    if (!isLoaded) {
        return <>Loading...</>
    } else {


        return (
            <>
                <p>Logged in as: {userId.username}</p>
                <div id="addTask"><button  onClick={addTask}>{newTaskVisible? '...nevermind':'Add New Task'}</button></div>
                {newTaskVisible? <AddItem adminView={adminView} userId={userId.id} setNewTaskVisible={setNewTaskVisible} fetchData={fetchData}/>:null}
                {adminView ? (
                    <>
                        {Object.values(taskList).map((x, index) => <ListItem id={x.id} key={index} title={x.title} creator_id={x.creator_id} is_complete={x.is_complete} comments={x.comments} currentItem={currentItem} setCurrentItem={setCurrentItem} fetchData={fetchData}/>)}
                    </>) : (<>
                        {Object.values(taskList).map((x, index) => <ListItem id={x.id} key={index} title={x.title} is_complete={x.is_complete} comments={x.comments} currentItem={currentItem} setCurrentItem={setCurrentItem} fetchData={fetchData} />)}
                    </>)}
            </>
        );
    }
}

export default Board;
