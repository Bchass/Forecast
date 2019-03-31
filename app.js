window.addEventListener('load', ()=> {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".temperature-description");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimeZone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  // Gets current location
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // proxy to overide localhost
      const proxy = "https://cors-anywhere.herokuapp.com/"
      // api for data
      const api = `${proxy}https://api.darksky.net/forecast/a7bc488da17321434c36f41fe7c48b07/${lat},${long}`;

      // Load in steps
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon }= data.currently;

          //Set DOM Elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;

          // Formula for celisus
          let celisus = (temperature - 32) * (5/9);

          let fahrenheit = (temperatureDegree);

          // Set icon
          setIcons(icon, document.querySelector(".icon"));

          // Change temp between celsius/farhient
          temperatureSection.addEventListener('click', ()=>{
            if(temperatureSpan.textContent === "F"){
              temperatureDegree.textContent = Math.round(fahrenheit);
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celisus);
            }else{
              temperatureSpan.textContent = "F";
              // Gets temp back from api
              temperatureDegree.textContent = temperature;
            }
          })
console.log(data);
        });
    });
  }
  // Format for skyicons
  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
