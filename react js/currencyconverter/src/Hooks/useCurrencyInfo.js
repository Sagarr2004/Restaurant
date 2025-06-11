import {useState , useEffect} from 'react';

function useCurrencyInfo(currency){
    const [data,setData] = useState({});

    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currency/${currency}.json`)
        .then((res) => res.json())
        .catch((res)=> setData(res[currency]));
    },[currency])

    return data;
}

export default useCurrencyInfo;

