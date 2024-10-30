const weatherInfo = document.getElementById('weather-info');
const outfitSuggestions = document.getElementById('outfit-suggestions');

// Function to fetch weather data from WeatherAPI
async function fetchWeather(city) {
    const apiKey = 'd3a69d238edd4de1bea83654242910'; // Replace with your actual API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await axios.get(url); // Fetch weather data
        const temperature = response.data.current.temp_c; // Get temperature
        const condition = response.data.current.condition.text; // Get condition

        // Get dress code advice based on the temperature
        const dressCodeAdvice = dressCode(temperature);

        // Display the weather info and dress code advice
        displayWeatherInfo(temperature, condition, dressCodeAdvice);

        // Generate outfit cards based on temperature
        generateOutfitCards(temperature);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML += `<p>Could not fetch weather data. Please try again later.</p>`;
    }
}

// Function to display weather information and dress code advice in HTML
function displayWeatherInfo(temperature, condition, dressCodeAdvice) {
    const weatherContent = `
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${condition}</p>
        <p>Advice: ${dressCodeAdvice[0]} - ${dressCodeAdvice[1]}</p>
    `;

    weatherInfo.innerHTML += weatherContent; // Append to weather info
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
// function to generate for outfits based on temperature
function generateOutfit(temperature) {
    outfitSuggestions.innerHTML = '';

    let outfits = [];

    if (temperature < 10) {
        outfits = [
            { type: 'Casual Wear', description: 'Cozy sweater and jeans.' },
            { type: 'Official Wear', description: 'Formal coat with trousers.' },
            { type: 'Trendy Wear', description: 'Chic winter dress with boots.' }
        ];
    } else if (temperature >= 10 && temperature < 25) {
        outfits = [
            { type: 'Casual Wear', description: 'Light jacket and long sleeves.' },
            { type: 'Official Wear', description: 'Smart blazer with a shirt.' },
            { type: 'Trendy Wear', description: 'Layered top with a stylish scarf.' }
        ];
    } else {
        outfits = [
            { type: 'Casual Wear', description: 'T-shirt and shorts.' },
            { type: 'Official Wear', description: 'Lightweight shirt with chinos.' },
            { type: 'Trendy Wear', description: 'Summer dress and sandals.' }
        ];
    }
}

// Fetch and display weather and dress code advice for Nairobi
fetchWeather('Nairobi');
