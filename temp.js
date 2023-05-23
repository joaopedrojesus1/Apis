
const apiKey = "e866ac8f08c08e2e6c8f10eef88d0f30";

function getTemperature() {
  const cityInput = document.getElementById('cityInput').value;
  const city = document.getElementById('city');
  const temperature = document.getElementById('temperature');
  const condition = document.getElementById('condition');

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      city.innerHTML = data.name;
      temperature.innerHTML = Math.round(data.main.temp - 273.15) + '°C';
      condition.innerHTML = data.weather[0].description;
    })
    .catch(error => {
      console.error(error);
      city.innerHTML = 'Erro ao buscar a temperatura';
      temperature.innerHTML = '';
      condition.innerHTML = '';
    });
}





