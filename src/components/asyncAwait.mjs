import fetch from "node-fetch";

const url = 'https://jsonplaceholder.typicode.com/todos/1'

// promises
fetch(url)
  .then(res =>  res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

//convert promiese to async await
const loadData = async() => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data
  } catch(err) {
    console.error(err);
  }
};

loadData(); // would return nothing because thats now how you call promises

// use async function to return a promise:
// method1:
loadData().then((data) => console.log(data));

//method2:
async function f1() {
  const data = await loadData();
  console.log(data);
}
f1();

//method3: Top level await:
( async() => {
  const data = await loadData();
  console.log(data);
})();

// promise.all to do multiple fetches
const loadAllData = async() => {
  try {
    const url1 = 'https://jsonplaceholder.typicode.com/todos/1'
    const url2 = 'https://jsonplaceholder.typicode.com/todos/2'
    const url3 = 'https://jsonplaceholder.typicode.com/todos/3'

    const results = await Promise.all([
      fetch(url1),
      fetch(url2),
      fetch(url3)
    ]);
    
    const dataPromises = results.map(result => result.json());
    const finalData = await Promise.all(dataPromises);
    
    // another way:
    // const finalData = await Promise.all(results.map(result => result.json()));
    return finalData;    
  } catch(err) {
    console.error(err);
  }
};

( async() => {
  const data = await loadAllData();
  console.log(data);
})();