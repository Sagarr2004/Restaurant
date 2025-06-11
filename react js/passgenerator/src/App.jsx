import { useState, useCallback , useEffect , useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState(""); // Corrected useState
  
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_?/-";

    for (let i = 0; i < length; i++) { 
      let char = Math.floor(Math.random() * str.length); 
      pass += str.charAt(char); // Corrected string concatenation
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);
  
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,30);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[setPassword,length,characterAllowed,numberAllowed]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700"> 
         <h1 className='text-white text-center'>Password Generator 
         </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
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
               setLength(e.target.value)
           }}
           />
           <label>Length : {length}</label>

           <div className='flex items-center gap-x-1'>
             <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e)=>{
                setNumberAllowed((prev) => !prev); //prev value la reverse karto just like true la false aani false la true 
            }}
             />
           </div>
           <label>Numbers</label>


           <div className='flex items-center gap-x-1'>
             <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="numberInput"
              onChange={(e)=>{
                setCharacterAllowed((prev) => !prev); //prev value la reverse karto just like true la false aani false la true 
            }}
             />
           </div>
           <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
