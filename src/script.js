const weatherInfo = document.getElementById('weather-info');

// Function to fetch weather data from WeatherAPI
async function fetchWeather(city) {
    const apiKey = 'd3a69d238edd4de1bea83654242910';  // Replace with your actual API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await axios.get(url);
        const temperature = response.data.current.temp_c;
        const condition = response.data.current.condition.text;

        // Get dress code advice based on the temperature
        const dressCodeAdvice = dressCode(temperature);

        // Display the weather info and dress code advice
        displayWeatherInfo(temperature, condition, dressCodeAdvice);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML += `<p>Could not fetch weather data. Please try again later.</p>`;
    }
}

// Function to display weather information and dress code advice in HTML
function displayWeatherInfo(temperature, condition, dressCodeAdvice) {
    // Create the weather content string
    const weatherContent = `
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${condition}</p>
        <p>Advice: ${dressCodeAdvice[0]} - ${dressCodeAdvice[1]}</p>
    `;

    // Append weather content to existing HTML
    weatherInfo.innerHTML += weatherContent;
}

// Function to predict what to wear based on temperature
function dressCode(temperature) {
    if (temperature < 10) {
        return ['Dress warmly', 'Carry your umbrella'];
    } else if (temperature >= 10 && temperature < 25) {
        return ['Layer your clothing', 'It might get colder in the evening'];
    } else {
        return ['Dress lightly', 'Stay hydrated'];
    }
}

// Fetch and display weather and dress code advice for Nairobi
fetchWeather('Nairobi');
