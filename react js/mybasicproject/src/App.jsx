import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState("white");

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1> React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
   
      <div className="w-full h-screen duration-200"
        style={{ backgroundColor: color }}
      >
        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
           
           <button
             onClick={() => setColor("red")}
             className="outline-none px-4 rounded-full"
             style={{ backgroundColor: "red", margin: 3 }}
           >
             Red
           </button>

           <button
             onClick={() => setColor("green")}
             className="outline-none px-4 rounded-full"
             style={{ backgroundColor: "green", margin: 3 }}
           >
             Green
           </button>

           <button
             onClick={() => setColor("black")}
             className="outline-none px-4 rounded-full"
             style={{ backgroundColor: "black", margin: 3 }}
           >
             Black
           </button>

           <button 
             onClick={() => setColor("blue")}
             className="outline-none px-4 rounded-full"
             style={{ backgroundColor: "blue", margin: 3 }}
           >
             Blue
           </button>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default App