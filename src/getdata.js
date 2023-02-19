import { useState } from "react";
import { useLayoutEffect, useEffect } from "react";
import Loading from "./loading/loading";

function Getdata() {
  const [weathers, setweather] = useState();
  const [search, setsearch] = useState("ha noi");
  const [isSuccess, setisSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8641075dda9ea5d5c961c48c00929bec`
      );

      if (data.status !== 200) {
        alert("Please search with English");
        setsearch("hanoi");
      } else {
        const data2 = await data.json();
        await setweather(data2);
        setisSuccess(true);
      }
      
    }
    fetchData();

    return () => {};
  }, [search]);

  renderBackground();
  const enterpress = (key, target) => {
    if (key === 13) {
      setsearch(target.value);
      target.value = "";
      setisSuccess(false);
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

  if (!isSuccess) {
    return <Loading />;
  } else {
    return (
      <div id="weather">
        <input
          type="text"
          placeholder="Search..."
          class="input-search"
          onKeyUp={(e) => enterpress(e.keyCode, e.target)}
        />

        <div class="content">
          <h1 class="name">
            <span class="city">{weathers.name}</span>
            <span>,</span>
            <span class="country">{weathers.sys.country}</span>
          </h1>
          <p class="time"></p>
          <div class="temperature">
            <span class="value">{weathers.main.temp}</span>
            <span>
              <sup>o</sup>C
            </span>
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
    );
  }
}

export default Getdata;
