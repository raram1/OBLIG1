// Array of locations to fetch weather data
const locations = [
    { city: "Oslo", latitude: 59.9133, longitude: 10.7389 },
    { city: "Bergen", latitude: 60.3894, longitude: 5.3300 },
    { city: "Stavanger", latitude: 58.9700, longitude: 5.7314 },
    { city: "Sandnes", latitude: 58.8517, longitude: 5.7361 },
    { city: "Trondheim", latitude: 63.4297, longitude: 10.3933 }
];

// This is an array to hold weather data from the cities i choose
let weatherData = [];

// This function fetches the weather data
function fetchWeather() {
    // this goes over each location
    locations.forEach(location => {
        // this is the api to get the weather information.
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;
        
        // fetch fetches weather data from the api
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // This puts the data into the array
                weatherData.push({
                    city: location.city, // the types of data we store
                    temperature: data.current_weather.temperature,
                    windspeed: data.current_weather.windspeed
                });
            })
            .then(weatherDisplayed); // this function calls to display the data in right order.
    });
}

// function to display data
function weatherDisplayed() {
    weatherData.sort((a, b) => a.city.localeCompare(b.city)); // this makes it appear in alphabetical order. 
                                                              // I did this so that the cities would'nt swap places 
                                                              // when I updated the page

    const container = document.getElementById('idCard'); // I find the card that im displaying data in
    container.innerHTML = ''; // this clears data in innerHTML

    // This makes all the cards for the weather data
    weatherData.forEach(weather => {
        const weatherDiv = document.createElement('div'); // I make a new div to show seperate
        weatherDiv.classList.add('wCard'); // This is so i can style the cards
        // Here i place all the data for a city onto a card
        weatherDiv.innerHTML = `
            <h2>${weather.city}</h2>
            <p>Temp: ${weather.temperature}°C</p>
            <p>Wind: ${weather.windspeed} km/h</p>
        `;
        container.appendChild(weatherDiv); // the card is appended to the container.
    });
}
// This is the initianal fetch to display the weather!
fetchWeather();
// This is how often it gets refreshed :D
setInterval(fetchWeather, 60000); 