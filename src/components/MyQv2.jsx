import React, {useState, useEffect, useRef } from "react";
import { render } from "react-dom";

// example on promises: 1:24 and 8:45
// promises help solve callback hell: 5:04

//https://codesandbox.io/s/react-functional-component-forked-m69gtb?file=/src/index.js

const Qv2 = props => {
  const [inputValue, setInputValue] = useState("");
  const text = useRef("");

  const [randomText, setRandomText] = useState()

  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    text.current = e.target.value;
  }

  const handleTextClick = () => {
    setInputValue(text.current);
  }

  const handleRandomNameClick = async() => {
    // multiple way of using async method

    // fetch("https://randomuser.me/api")
    // .then((response) => response.json())
    // .then((data) => setRandomText(data.results[0].name.first));

    try {
      const response = await fetch("https://randomuser.me/api");
      const data = await response.json();
      setRandomText(data.results[0].name.first)
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = () => {
    setIsLoading(true);
    Promise.all([p1(), p2()]).then((values) => {
      console.log(values);
      setResult(values)
    }).catch((error) => console.error(error))
    .finally(() => {setIsLoading(false);})
  }

  const p1 = () => {
    const promise = new Promise((resolve, reject) => {
      if (inputValue.length % 2 === 0) {
        resolve({ id: 1, msg: "p1 success"});
      } else {
        reject("p1 failed")
      }
    });
    return promise;
  }

  const p2 = () => {
    const promise = new Promise((resolve, reject) => {
      if (!isNaN(randomText)) {
        resolve({id: 2, msg: "p2 success"})
      } else {
        reject("p2 failed")
      }
    });
    return promise;
  }

  useEffect(() => {
    // async method
    // can also put all the fetch into a fetch Hook
    setIsLoading(true);
    fetch("https://www.randomnumberapi.com/api/v1.0/random")
    .then((response) => response.json())
    .then((data) => setRandomText(data[0]))
    .catch((error) => console.error(error))
    .finally( () => {setIsLoading(false)});
  },[]);

  return (
    <div>
      <input onChange={handleTextChange} />
      <button type="button" onClick={handleTextClick}> Click Me! </button>
      <div>{inputValue}</div>
      <br />
      <button onClick={handleRandomNameClick}> Generate Random Number </button>
      <div>
        {isLoading ? (
          <div> isLoading... </div>
        ) : (
          <div> {randomText} </div>
        )}
      </div>
      <br />
      <button onClick={handleSubmit}> Submit </button>
      <div> 
        {result.map((data) => (
          <div key={data.id}> {data.msg} </div>
        ))} 
      </div>
    </div>
  )

}


export default Qv2;
// render(<App />, document.getElementById("root"));
