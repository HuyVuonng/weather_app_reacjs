
import { useEffect } from 'react';
import './App.css';
import Getdata from './getdata';

function App() {

  useEffect(()=>{
    document.title='Weather App'
  },[])

    return(
        <Getdata/>
      )
  }


    
    


export default App;
