import { useState } from 'react'
import './App.css'
import Card from './Card.jsx'

function App() {

  return (
    <>
       <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Hello EveryOne !! Saggy is Here..</h1>
       <Card username="Saggy" btnText="Click Me"/>
       <Card username="Pallu" btnText="Visit Me"/>
    </>
  )
}

export default App
