import React, { useState } from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider, useDrag } from 'react-dnd';

import Bin from './Bin';
import Bag from './Bag';

const App = () => {
  const [boxes, setBoxes] = useState([
    { type: "one", id: 1 },
    { type: "two", id: 2 },
    { type: "three", id: 3 },
    { type: "three", id: 4 },
    { type: "one", id: 5 },
    { type: "one", id: 6 },
    { type: "two", id: 7 },
    { type: "three", id: 8 },
    { type: "one", id: 9 }
  ]);

  const [bags, setBags] = useState([
    { type: "one", id: 1 },
    { type: "two", id: 2 },
    { type: "three", id: 3 },
    { type: "three", id: 4 },
    { type: "one", id: 5 },
    { type: "one", id: 6 },
    { type: "two", id: 7 },
    { type: "three", id: 8 },
    { type: "one", id: 9 }
  ]);

  const box_style = {
    border: "1px dashed black",
    display: "inline-block",
    margin: "1em",
    padding: "1em"
  }

  const Box = ({type, id, dropHandler}) => {
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
        <div ref={drag} style={box_style}>Box: {type}!</div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div style={{width:"100%", float:"left"}}>
          { boxes.map((box, i) => (
            <Box {...box} key={i} dropHandler={ item => {
              const without = boxes.filter(box => JSON.stringify(box) !== JSON.stringify(item));
              setBoxes(without);
            }}/>)
          )}
        </div>
        <div style={{width:"100%", float:"left"}}>
          <Bin type="one" />
          <Bin type="two" />
          <Bin type="three" />
        </div>
        <div style={{width:"100%", float:"left"}}>
          { bags.map((bag, i) => (
            <Bag {...bag} key={i} dropHandler={ item => {
              const without = bags.filter(bag => JSON.stringify(bag) !== JSON.stringify(item));
              setBags(without);
            }}/>)
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;