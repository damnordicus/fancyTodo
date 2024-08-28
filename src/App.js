import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Board from './Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState([]);
  
  const [adminView, setAdminView] = useState(false);
  useEffect(() => {
    if(userLoggedIn.length > 0){
      if(userLoggedIn[0].is_admin){
        setAdminView(true);
      }
    }
      
  },[userLoggedIn])

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
      <header onClick={() => {window.location.reload()}}>
        Fancy Task Checklist
      </header>
      <div className="main-body">
      {userLoggedIn.length?(null):(<Login setUserLoggedIn={setUserLoggedIn} />)}
      {userLoggedIn.length && adminView ?(
        <>
        <Board adminView={adminView} userId={userLoggedIn[0]}/>
        </>
        ):(null)}
      {userLoggedIn.length && !adminView ?(
        <>
        <Board adminView={adminView} userId={userLoggedIn[0]}/>
        </>
        ):(null)}

      </div>
      </DndProvider>
    </div>
  );
}

export default App;
