import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length , setlength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberallowed]=useState(false);
  const [charAllowed, setCharallowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
     let pass="";
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
     
    if(numberAllowed) str = str+"0123456789";

    if(charAllowed) str = str+"!@#$%^&*()_+-/?<>";

    for(let i=0; i<length; i++)
      {
        let char = Math.floor(Math.random() * str.length);

        pass = pass + str.charAt(char);
      }

      setPassword(pass);

  },[length,charAllowed,numberAllowed])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,30);
    window.navigator.clipboard.writeText(password);
  },[password]);

useEffect(()=>{
  passwordGenerator();
},[setPassword,length,charAllowed,numberAllowed]);

  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700' >
        <h1 className='text-white text-center'>Password Generator</h1>
         <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 m-5'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-600 text-white px-4 py-0.2 shrink-0 ' >Copy</button>
         </div>

         <div className='flex text-sm gap-x-2 my-5'>
          <div className='flex items-center gap-x-1'>
            <input 
             type='range'
             min={8}
             max={20}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{
                  setlength(e.target.value);
             }}
            />
            <label>Length : {length}</label>

            <div className='flrx items-center gap-x-1'>
              <input 
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={(e)=>{
                setNumberallowed((prev) => !prev);
              }}
              />
              <label> Numbers </label>
            </div>
            
            <div className='flrx items-center gap-x-1'>
              <input 
              type='checkbox'
              defaultChecked={charAllowed}
              id='numberInput'
              onChange={(e)=>{
                setCharallowed((prev) => !prev);
              }}
              />
              <label> Characters </label>
            </div>
          </div>
         </div>

       </div>
    </>
  )
}

export default App
