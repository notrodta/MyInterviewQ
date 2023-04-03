import React, {useState, useEffect, useRef } from "react";
import { render } from "react-dom";

// example on promises: 1:24 and 8:45
// promises help solve callback hell: 5:04

//https://codesandbox.io/s/react-functional-component-forked-m69gtb?file=/src/index.js

const Qv3 = props => {
  const [inputValue, setInputValue] = useState("");
  const text = useRef("");
  const text2 = useRef("");

//   const [randomText, setRandomText] = useState()

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTextChange = (e) => {
    text.current = e.target.value;
  }

  const handleTextClick = () => {
    setInputValue(text.current);
  }

  // Same as function below, but dont need async function
  // const handleNameFromAPIClick = () => {
  //   // multiple way of using async method

  //   fetch("https://randomuser.me/api")
  //   .then((response) => response.json())
  //   .then((data) => setInputValue(data.results[0].name.first));
  // }

  const handleNameFromAPIClick = async() => {
    // multiple way of using async method

    // fetch("https://randomuser.me/api")
    // .then((response) => response.json())
    // .then((data) => setRandomText(data.results[0].name.first));
    console.log(text2.current.value);
    try {
      const response = await fetch(`https://api.github.com/users/${text2.current.value}`);
      const data = await response.json();
      setInputValue(data.login)
    } catch (error) {
      console.error(error);
    }
  }

  //https://dmitripavlutin.com/javascript-fetch-async-await/#:~:text=fetch()%20starts%20a%20request,with%20promises%20with%20syntactic%20sugar.
  //5. Parallel fetch requests
  const handleSubmit = async() => {
    const t1 = fetch("https://randomuser.me/api")
    const t2 = fetch("https://api.github.com/users/Bob")

    try {
      const [user1Response, user2Response] = await Promise.all([t1, t2]);
      const user1 = await user1Response.json();
      const user2 = await user2Response.json();
      const result = [user1.results[0].name.first, user2.login];
      setUserList(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    // async method
    // can also put all the fetch into a fetch Hook

    // Example of a failed api call and console error
    // fetch("https://www.randomnumberapi.com/api/v1.0/random")
    // .then((response) => response.json())
    // .then((data) => setRandomText(data[0]))
    // .catch((error) => console.error("error!: " , error))
    // .finally( () => {setIsLoading(false)});

    fetch("https://randomuser.me/api")
    .then((response) => response.json())
    .then((data) => setInputValue(data.results[0].name.first))
    .catch((error) => console.error(error))
  },[]);

  return (
    <div>
      <div>
      <h2> {inputValue} </h2>
      </div>
      <input onChange={handleTextChange} />
      <button type="button" onClick={handleTextClick}> Click Me! </button>
      <br />
      {/* <input onChange={handleGetNameFromAPITextChange} /> */}
      <input type="text" ref={text2} />
      <button onClick={handleNameFromAPIClick}> Get Name from API </button>
      <br />
      <button onClick={handleSubmit}> Get names from 2 APIs </button>
      <div> 
        {isLoading ? (
          <h2> No Data... </h2>
        ) : (
          <>
            {userList.map((data, i) => (
              <div key={i}> {data} </div>
            ))}
          </> 
        )}
      </div>
    </div>
  )

}


export default Qv3;
// render(<App />, document.getElementById("root"));
