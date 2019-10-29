import React from 'react';

import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider, useDrag, useDrop } from 'react-dnd';

const bin_style = {
  color: "white",
  float: "left",
  height: "100px",
  margin: "1em",
  width: "100px"
}

const box_style = {
  border: "1px dashed black",
  display: "inline-block",
  margin: "1em",
  padding: "1em"
}

class App extends React.Component {
  state = {
    boxes: [
      { type: "one", id: 1 },
      { type: "two", id: 2 },
      { type: "three", id: 3 },
      { type: "three", id: 4 },
      { type: "one", id: 5 },
      { type: "one", id: 6 },
      { type: "two", id: 7 },
      { type: "three", id: 8 },
      { type: "one", id: 9 }
    ]
  }

  render() {
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

    const Box = ({type, id, dropHandler}) => {
      const [, drag] = useDrag({
          item: { type, id },
          end: (item, monitor) => {
              const dropResult = monitor.getDropResult();
              console.log(item)
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
          <div ref={drag} style={box_style}>Drag: {type}!</div>
      )
    }

    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          { this.state.boxes.map((box, i) => (
            <Box {...box} key={i} dropHandler={ item => {
              const without = this.state.boxes.filter(box => JSON.stringify(box) !== JSON.stringify(item));
              const boxes = [...without, item];
              this.setState({boxes: boxes});
            }}/>)
          )}
          <div>
            <Bin type="one" />
            <Bin type="two" />
            <Bin type="three" />
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default App;
