import React from 'react';
import { useDrag } from 'react-dnd';

const style = {
  border: "1px dashed black",
  display: "inline-block",
  margin: "1em",
  padding: "1em"
}

const Bag = ({type, id, dropHandler}) => {
    const [, drag] = useDrag({
        item: { type, id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(monitor.getItem(), monitor.getItemType())
            if (item && dropResult) {
                switch(dropResult.type) {
                    case "one":
                    case "two":
                    case "three":
                        dropHandler(item);
                        break;
                    default:
                        console.log("Unrecognized slot!");
                }
            }
        }
    })

    return (
        <div ref={drag} style={style}>Bag: {type}!</div>
    )
}

export default Bag;
