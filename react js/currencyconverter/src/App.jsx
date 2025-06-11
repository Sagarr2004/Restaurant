import { useState } from 'react'
import './App.css'

import InputBox from './InputBox'
import useCurrencyInfo from './Hooks'

function App() {
  
  const [amt,setAmt] = useState(0)
  const [from,setFrom] = useState("usd")
  const [to,setTo] = useState("inr")
  const [converter,SetConverter] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = ()=>{
   setFrom(to);
   setTo(from);
   setAmt(converter);
   SetConverter(amt);
  }


  const convert = ()=>{
    SetConverter(amt * currencyInfo[to]);
  }


  return (
    <>
      

    </>
  )
}

export default App
