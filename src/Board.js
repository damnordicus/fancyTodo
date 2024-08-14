//import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './Board.css';
//import Login from './Login';
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
        console.log(data);
        setIsLoaded(true); 
    }
    useEffect(() => {
        fetchData();
    },[])

    const addTask = () => {
        setNewTaskVisible(!newTaskVisible);
    }

    const groupedTasks = taskList.reduce((groups, task) => {
        const {group_id} = task;
        if(!groups[group_id]){
            groups[group_id] = [];
        }
        groups[group_id].push(task);
        return groups;
    }, {});

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
                        {Object.values(taskList).map((x, index) => <ListItem id={x.id} key={index} name={x.username} title={x.title} creator_id={x.creator_id} is_complete={x.is_complete} comments={x.comments} currentItem={currentItem} setCurrentItem={setCurrentItem} fetchData={fetchData}/>)}
                    </>) : (<>
                        {console.log(groupedTasks)}
                        {Object.entries(groupedTasks).map(([group_id, tasks]) => (
                            <div key={group_id} className={`group-${group_id}`} style={{ textAlign: "center", border: "solid", borderRadius: "20px"}}>
                                <h3>Group {group_id}</h3>
                                {Object.values(tasks).map((x, index) => <ListItem id={x.id} key={index} title={x.title} is_complete={x.is_complete} comments={x.comments} currentItem={currentItem} setCurrentItem={setCurrentItem} fetchData={fetchData} />
                            )}
                            </div>
                        ))}
                        
                    </>)}
            </>
        );
    }
}

export default Board;
