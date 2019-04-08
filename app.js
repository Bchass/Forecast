window.addEventListener('load', () => {
  let long;
  let lat;

  // Current
  const temperatureDescription = document.querySelector(".temperature-description");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  const locationTimeZone = document.querySelector(".location-timezone");

  const minutelyDescription = document.querySelector(".minutely-description");

  const hourlyDescription = document.querySelector(".hourly-description");

  const dailyDescription = document.querySelector(".daily-description");

  // Gets current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // proxy to overide localhost
      const proxy = "https://cors-anywhere.herokuapp.com/";
      // api for data
      const api = `${proxy}https://api.darksky.net/forecast/a7bc488da17321434c36f41fe7c48b07/${lat},${long}`;

      // Current data
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {
            temperature,
            summary,
            icon
          } = data.currently;

          // Current
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;

          // Minutely data
          fetch(api)
            .then(response => {
              return response.json();
            })
            .then(data => {
              const {
                summary
              } = data.minutely;

              // minutely
              minutelyDescription.textContent = summary;


          // Hourly data
          fetch(api)
            .then(response => {
              return response.json();
            })
            .then(data => {
              const {
                summary
              } = data.hourly;

              // Hourly
              hourlyDescription.textContent = summary;

              // Daily data
              fetch(api)
                .then(response => {
                  return response.json();
                })
                .then(data => {
                  const {
                    summary
                  } = data.daily;

                  // Daily
                  dailyDescription.textContent = summary;

                  // Formula for celisus
                  let celisus = (temperature - 32) * (5 / 9);

                  // Set icon
                  setIcons(icon, document.querySelector(".icon"));

                  // Change temp between celisus/fahrenheit
                  temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                      temperatureSpan.textContent = "C";
                      temperatureDegree.textContent = Math.floor(celisus);
                    } else {
                      temperatureSpan.textContent = "F";
                      // Gets temp back from api
                      temperatureDegree.textContent = Math.round(temperature);
                    }
                  });
                  console.log(data);
                });
            });
        });
      // Format for skyicons
      function setIcons(icon, iconID) {
        const skycons = new Skycons({
          color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
      }
    });
  });
}
});
