import { useState } from "react";
import { useEffect } from "react";
import Loading from "./loading/loading";
import httpRequest from "./Search/search";

function Getdata() {
  const [weathers, setweather] = useState();
  const [search, setsearch] = useState("ha noi");
  const [isSuccess, setisSuccess] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8641075dda9ea5d5c961c48c00929bec`
  //     );

  //     if (data.status !== 200) {
  //       alert("Please search with English");
  //       setsearch("hanoi");
  //     } else {
  //       const data2 = await data.json();
  //       await setweather(data2);
  //       setisSuccess(true);
  //     }
      
  //   }
  //   fetchData();

  //   return () => {};
  // }, [search]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await httpRequest('https://api.openweathermap.org/data/2.5/weather',search)
        setweather(result.data);
        setisSuccess(true);
      } catch (error) {
        alert("Please search with English");
        setsearch("hanoi");
      }
      
    }
    fetchData();
  }, [search]);

  renderBackground();
  const enterpress = (key, target) => {
    if (key === 13) {
      if(!!target.value){
        setsearch(target.value);
        target.value = "";
        setisSuccess(false);
      }
      else{
        alert("Please enter the name of the city")
      }
    }
  };

  function renderBackground() {
    if (isSuccess) {
      if (weathers.main.temp > 18) {
        document.body.className = "hot";
      } else if (weathers.main.temp <= 18 && weathers.main.temp >= 5) {
        document.body.className = "cold";
      } else {
        document.body.className = "snow";
      }
    }
  }

  const handleChange = (e) => {
    if(e.target.value.startsWith(" ")){
      e.target.value = "";
    }
  }

    return (
      <>
      {!isSuccess ? <Loading/> : (
         <div id="weather">
         <input
           type="text"
           placeholder="Search..."
           className="input-search"
           onKeyUp={(e) => enterpress(e.keyCode, e.target)}
           onChange={handleChange}
         />
 
         <div className="content">
           <h1 className="name">
             <span className="city">{weathers.name}</span>
             <span>,</span>
             <span className="country">{weathers.sys.country}</span>
           </h1>
           <p className="time"></p>
           <div className="temperature">
             <span className="value">{weathers.main.temp}</span>
             <span>
               <sup>o</sup>C
             </span>
           </div>
           <div className="short-desc">{weathers.weather[0].main}</div>
           <div className="desc">{weathers.weather[0].description}</div>
           <div className="more-desc">
             <div className="visibility">
               <i className="far fa-eye"></i>
               <span>{weathers.visibility}(m)</span>
             </div>
             <div className="wind">
               <i className="fas fa-wind"></i>
               <span>{weathers.wind.speed}(m/s)</span>
             </div>
             <div className="cloud">
               <i className="fas fa-cloud-sun"></i>
               <span>{weathers.clouds.all}(%)</span>
             </div>
           </div>
         </div>
       </div>
      )}
      </>

    )
     
  }

export default Getdata;
