import React, { Children, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';

const Draggable = ({ id, initialPosition, children, onDrop}) => {

     const [position, setPosition] = useState({top: 0, left: 0});

     useEffect(() => {
        const initial = initialPosition.find(pos => pos.group_id === parseInt(id));
        if(initial){
            setPosition({top: initial.posY, left: initial.posX});
        }
     }, [initialPosition, id]);

    // for(let i = 0; i < initialPosition.length; i++){
    //     console.log('i:  ' , newid, '  initP:  ', initialPosition[i].group_id);
    //     if(newid === initialPosition[i].group_id){
    //         console.log('test')
    //         setPosition({ top: initialPosition[i].posY, left: initialPosition[i].posX});
    //     }
    // }

  
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: async (item, monitor) => {               
                const offset = monitor.getClientOffset();
                if(offset){
                    setPosition({
                        top: offset.y - 10,
                        left: offset.x - 200
                    });
                    console.log("L:  ", position.left, " T:  ", position.top)
                    try{
                        await fetch(`http://localhost:8080/group/${id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            posX: offset.x - 200, //position.left,
                            posY: offset.y - 10, //position.top,
                        })
                    });
                    } catch(error){
                        console.error(error);
                    }
                    // console.log("id:  ", id);
                    // console.log("sentX:  ", position.left);
                    // console.log("sentY:  ", position.top);
                    if(onDrop) onDrop({ id, position: { top: offset.y - 10, left: offset.x - 200}})
                }
        }
    }), [id,onDrop]);

    return (
        <div ref={drag} style={{
            position: 'absolute', 
            top: position.top, 
            left: position.left, 
            opacity: isDragging ? 0.5: 1, 
            // border: 'solid', 
            borderRadius: '20px', 
            textAlign: 'center', 
            padding: '10px', 
            backgroundColor: '#fff', 
            minWidth: '400px',
            boxShadow: isDragging? '10px 10px 40px 15px black': '5px 5px 10px 0px black'}}>
            {children}
        </div>
     )
    
}

export default Draggable;