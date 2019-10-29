import React from 'react';
import { useDrop } from 'react-dnd';

const bin_style = {
    color: "white",
    float: "left",
    height: "100px",
    margin: "1em",
    width: "100px"
}

const Bin = ({type}) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: type,
        drop: () => ({ type: type }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })
    const isActive = canDrop && isOver;
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    
    return (
        <div ref={drop} style={{...bin_style, backgroundColor}}>{type}</div>
    )
}

export default Bin;
