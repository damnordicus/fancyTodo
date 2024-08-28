import React, { Children, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';

const Draggable = ({ id, initialPosition, children, onDrop, getPos, pX, pY }) => {

    useEffect(() => {
        getPos(id);
    },[pX]);

    console.log("readingX", pX)

    const [position, setPosition] = useState({top: pY, left: pX});
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {               
                const offset = monitor.getClientOffset();
                if(offset){
                    setPosition({
                        top: offset.y - 10,
                        left: offset.x - 200
                    });
                    fetch(`http://localhost:8080/group/${id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            posX: position.left,
                            posY: position.top,
                        })
                    });
                    console.log("id:  ", id);
                    console.log("sentX:  ", position.left);
                    console.log("sentY:  ", position.top);
                    if(onDrop) onDrop({ id, position: { top: offset.y - 50, left: offset.x -50}})
                }
        }
    }), [initialPosition, onDrop]);

    console.log("id " + id + " using x and Y: ", position)

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