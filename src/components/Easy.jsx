import React, {useState, useEffect, useRef } from "react";
import { render } from "react-dom";

const Easyv1  = props => {
  const userInput = useRef("");
  const [items, setItems] = useState([]);

  const handleSubmit = () => {
    const itemList = [...items, { name: userInput.current.value, count: 1 }]
    setItems(itemList);
    userInput.current.value = "";
  }

  const handleIncrementClick = (idx) => {
    const itemList = [...items]
    const item = items[idx];
    item.count++;
    itemList.splice(idx,1,item);
    setItems(itemList);
  }

  const handleDecrementClick = (idx) => {
    const itemList = [...items]
    const item = items[idx];
    item.count--;
    if (item.count > 0) {
      itemList.splice(idx,1,item);
    } else {
      itemList.splice(idx,1);
    }
    setItems(itemList);
  }

  return (
    <div>
        <input type="text" ref={userInput}/>
        <button onClick={handleSubmit}> submit </button>
        <ul>
          {
            items.map((item, idx) => {
              return (
                <li key={idx}>
                  {item.name} - {item.count}
                  <button onClick={() => handleIncrementClick(idx)}>increment</button> 
                  <button onClick={() => handleDecrementClick(idx)}>decrement</button> 
                </li>
                )
            })
          }
        </ul>
    </div>
  )
}


export default Easyv1;
