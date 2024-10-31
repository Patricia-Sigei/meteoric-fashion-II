const weatherInfo = document.getElementById('weather-info');
const outfitSuggestions = document.getElementById('outfit-suggestions');

// Function to fetch weather data from WeatherAPI
async function fetchWeather(city) {
    const apiKey = 'd3a69d238edd4de1bea83654242910'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await axios.get(url); 
        const temperature = response.data.current.temp_c; 
        const condition = response.data.current.condition.text; 

       
        const dressCodeAdvice = dressCode(temperature);

        displayWeatherInfo(temperature, condition, dressCodeAdvice);

        generateOutfit(temperature);

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


fetchWeather('Nairobi');
