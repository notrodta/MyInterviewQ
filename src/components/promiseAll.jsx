import {useEffect} from "react";

export default function App() {

  function resolveAfter2Seconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  function resolveAfter5Seconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, 5000);
    });
  }

  // takes 12 seconds for whoe operaation to complete
  async function f1() {
    const a = await resolveAfter5Seconds(5);
    console.log(a);
    const x = await resolveAfter2Seconds(10);
    console.log(x); // 10
    const y = await resolveAfter5Seconds(20);
    console.log(y);
  }

  // takes 5 seconds for operation to complete
  const handleSubmit = async() => {
    const a = resolveAfter5Seconds(5);
    const x = resolveAfter2Seconds(10);
    const y = resolveAfter5Seconds(20);


    const [a1, x1, y1] = await Promise.all([a, x, y]);
    console.log(a1, x1, y1);
  }


  return (
    <div className="App">
      <button onClick={() => f1()}> test </button>
      <button onClick={() => handleSubmit()}> test2 </button>
    </div>
  );
}
