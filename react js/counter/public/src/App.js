import './App.css';
import { useState } from 'react';


function App() {

  const [count , setCount] = useState(0);

  
  const decreVal = ()=>
  {
    if(count > 0)
      {
      setCount(count-1);
      console.log(`Decrease Value : ${count}`)
      }
    else{
      console.log("Aray! Bhai Bss kar Ja jaun kam kar");
    }
   
  }


  const addValue = () =>
  {
      if(count <20)
        {
          setCount(count+1);
          console.log(`Add Value : ${count}`)
        }
      else{
        console.log("Aray! Bhai Bss kar Ja jaun kam kar");
      }
      
  }

  
  return (
    <>
      <h1>Saggy's Counter</h1>
      <h2>Counter Value : {count}</h2>

      <button onClick ={addValue} >Add Value</button>
      <br/>
      <button onClick ={decreVal} >Decrease Value</button>
    </>
  );
}

export default App;
