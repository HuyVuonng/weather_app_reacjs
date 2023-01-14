
import './App.css';
import Content from './Content';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

const [weathers, setweather]= useState()
const [search, setsearch] = useState("ha noi")


//  useEffect(async () => {

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=ha noi&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`

//     const res = await fetch(url)
//     const weather = await res.json()
//     await setweather(weather)
// //     

//   },[])

  useEffect(() => {    
//      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8641075dda9ea5d5c961c48c00929bec`)
//     .then(res => res.json()).then(weathers=>setweather(weathers))

async function fetchData() {
    if(await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8641075dda9ea5d5c961c48c00929bec`).then(data=>data.status)!==200){
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=hanoi&units=metric&appid=8641075dda9ea5d5c961c48c00929bec`)
        .then(res => res.json()).then(weathers=>setweather(weathers)).catch(err => Promise.reject()) 
        alert("Please search with English")
       
    }
    else{
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8641075dda9ea5d5c961c48c00929bec`)
        .then(res => res.json()).then(weathers=>setweather(weathers)).catch(err => Promise.reject()) 
       
    }
      
            
      }
     
      fetchData();
       
      return ()=>{}
    }, [search]);


const enterpress=(key,target)=>{
      if(key === 13){
            setsearch(target.value)
           target.value="";
      }
    

}
//   console.log(weathers)
  if (!weathers) return <div>Loading...</div>;
  
  else{weathers.main.temp >= 18? document.body.className = 'hot' : document.body.className = 'cold'
    { if(weathers.main.temp>18){
        document.body.className = 'hot'
        }
    else if(weathers.main.temp<=18&&weathers.main.temp>=5){
        document.body.className = 'cold'
    }
    else{
        document.body.className = 'snow'
    }
    }
    return(
        <div id="weather">
           
        <input type="text" placeholder="Search..." class="input-search"
        onKeyUp={e=>enterpress(e.keyCode,e.target)} />

        <div class="content">
            <h1 class="name">
                <span class="city">{weathers.name}</span>
                <span>,</span>
                <span class="country">{weathers.sys.country}</span>
            </h1>
            <p class="time"></p>
            <div class="temperature">
                <span class="value">{ weathers.main.temp}</span>
                <span><sup>o</sup>C</span>
            </div>
            <div class="short-desc">{weathers.weather[0].main}</div>
            <div class="desc">{weathers.weather[0].description}</div>
            <div class="more-desc">
                <div class="visibility">
                    <i class="far fa-eye"></i>
                    <span>{weathers.visibility}(m)</span>
                </div>
                <div class="wind">
                    <i class="fas fa-wind"></i>
                    <span>{weathers.wind.speed}(m/s)</span>
                </div>
                <div class="cloud">
                    <i class="fas fa-cloud-sun"></i>
                    <span>{weathers.clouds.all}(%)</span>
                </div>
            </div>
        </div>
    </div>
      )
  }
  
    }

    
    


export default App;
