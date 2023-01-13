import { useState } from "react"
import { useEffect } from 'react';

// async và await để xử lý lấy api trc r mới chạy
 function Content(){
    const [weathers, setweather]= useState()
    //  useEffect(async () => {

    //     const url = `https://api.openweathermap.org/data/2.5/weather?q=ha noi&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`

    //     const res = await fetch(url)
    //     const weather = await res.json()
    //     await setweather(weather)
    // //     

    //   },[])

      useEffect(() => {
        async function fetchData() {
        await fetch('https://api.openweathermap.org/data/2.5/weather?q=ha noi&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667')
            .then(res => res.json()).then(weathers=>setweather(weathers))
           
        }
        fetchData();
      }, []);

      console.log(weathers)
      if (!weathers) return <div>Loading...</div>;
      
      else{
        { weathers.main.temp >= 18? document.body.className = 'hot' : document.body.className = 'cold'}
        return(
            <div id="weather">
               
            <input type="text" placeholder="Search..." class="input-search" />
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
                <div class="more-desc">
                    <div class="visibility">
                        <i class="far fa-eye"></i>
                        <span>{weathers.visibility}</span>
                    </div>
                    <div class="wind">
                        <i class="fas fa-wind"></i>
                        <span>{weathers.wind.speed}</span>
                    </div>
                    <div class="cloud">
                        <i class="fas fa-cloud-sun"></i>
                        <span>{weathers.clouds.all}</span>
                    </div>
                </div>
            </div>
        </div>
          )
      }
      
}
export default Content