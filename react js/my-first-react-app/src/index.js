import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
  //  import Saggy from "./App";

const domElement = React.createElement(
  'a',
  {
    href:'https://instagram.com', type:'_blank'
  },
  'click me to visit Instagram'
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
   domElement
  
);

