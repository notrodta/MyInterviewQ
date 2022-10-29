import React, { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';


//Why and When To Use Custom Hooks. The main reason to write a custom hook is for code reusability. 
//For example, instead of writing the same code across multiple components that use the same common stateful logic 
//(say a “setState” or localStorage logic), you can put that code inside a custom hook and reuse it

function Dashboard() {
    const [name, setName] = useState<string>('John');

    //todo: create a nameCount function. useEffect with name as dependency

    const randomAnimal = useFetch('https://randomuser.me/api');
    const randomCity = useFetch('https://randomuser.me/api');
    const randomCountry = useFetch('https://randomuser.me/api');
    const randomPlanet = useFetch('https://randomuser.me/api');

    const handleNameChange = (event: any) => {
        setName(event.target.value)
    }

    useEffect(() => {
        fetch('https://randomuser.me/api')
            .then(response => response.json())
            .then(data => {
                setName(data.results[0].name.first)
            });
    }, []); // explain dependency list here

    return (
        <div>
            <div>
                <input type="text" onChange={handleNameChange}/>
            </div>
            <div>
                Hello {name}
            </div>
            <div>
               {randomAnimal[0]?.results[0].name.first}
            </div>
            <div>
               {randomCity[0]?.results[0].name.first}
            </div>
            <div>
               {randomCountry[0]?.results[0].name.first}
            </div>
            <div>
               {randomPlanet[0]?.results[0].name.first}
            </div>
        </div>
    );
}

export default Dashboard;

  