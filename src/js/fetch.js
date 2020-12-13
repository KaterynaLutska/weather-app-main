import refs from "./refs.js";
//import debounce from "lodash.debounce";

const {
  city,
  temp,
  icon,
  description,
  humidity,
  wind,
  weather,
  input,
  button,
} = refs; // деструктуризація
let apiKey = `f705e9d637c5472c24eb60dad72d6526`;

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getFetsch(input.value);
  }
});
button.addEventListener("click", () => {
  getFetsch(input.value);
});

function getFetsch(query) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
  let result = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let tempC = Math.round(data.main.temp - 273.15);
      city.textContent = `Weather in ${data.name}`;
      temp.textContent = `${tempC}°C`;

      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      icon.alt = data.weather[0].description;
      description.textContent = data.weather[0].description;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      wind.textContent = `Wind speed: ${data.wind.speed}km/h`;

      weather.classList.remove("loading");
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;
    })
    .catch((error) => {
      // опрацьовує помилки в запиті
      console.log(error);
      console.log("Mistake");
    });
  return result;
}
