"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = "163f3d7e07ceb73bf55e63b2c8bd78a8"; 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
        setCity(data.name);
      });
    }
  }, []);

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Error fetching weather.");
    }
  };

  const isRaining = weather?.weather[0]?.main?.toLowerCase() === "rain";

  const getFarmingTip = () => {
  if (!weather) return "";

  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const condition = weather.weather[0].main.toLowerCase();

  // Basic tips based on simple conditions
  if (condition.includes("rain")) {
    return "🌧️ Rain expected – Delay pesticide spraying and ensure drainage in fields.";
  } else if (temp >= 35) {
    return "🔥 High temperature – Provide adequate irrigation and mulch to retain soil moisture.";
  } else if (temp <= 15) {
    return "❄️ Low temperature – Consider crop protection with polythene or straw mulch.";
  } else if (humidity > 80) {
    return "💧 High humidity – Watch for fungal infections, ensure proper ventilation in greenhouses.";
  } else {
    return "🌿 Weather is normal – Good time for sowing, weeding, or intercultural operations.";
  }
};


  return (
    
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-sky-400 to-blue-800 text-white"} min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden`}>
      {isRaining && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="rain"></div>
        </div>
      )}

 
        
<header
  className={`fixed top-0 z-50 w-full shadow-md p-4 flex justify-between items-center transition-colors duration-300 ${
    darkMode
      ? 'bg-gray-900 text-white'
      : 'bg-gradient-to-br from-sky-500 to-blue-700 text-white backdrop-blur-md bg-opacity-90'
  }`}
>

  <h1 className="text-2xl font-bold">🌾 MausamSathi</h1>

  <button
    onClick={() => setDarkMode(!darkMode)}
    className={`px-4 py-2 rounded-lg transition ${
      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
    }`}
  >
    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
  </button>
</header>







      <div className="z-10 bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">🌦️ Aaj Ka Mossam 	</h1>
          
        </div>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 text-black placeholder-gray-600 focus:outline-none"
        />

        <button
          onClick={getWeather}
          className="w-full py-2 bg-white text-blue-800 font-semibold rounded-lg hover:bg-blue-100 transition"
        >
          Get Weather
        </button>

        {error && <p className="mt-4 text-red-300">{error}</p>}

        {weather && (
          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h2>
            <p className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather-icon"
                className="w-12 h-12"
              />
              {weather.weather[0].description}
            </p>
            <p><strong>🌡️ Temp:</strong> {weather.main.temp}°C</p>
            <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>🌬️ Wind:</strong> {weather.wind.speed} m/s</p>
          </div>
        )}
<div className={`mt-4 p-4 rounded-lg shadow-md ${
  darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"
}`}>
  <h3 className="font-bold text-lg mb-1">👨‍🌾 Farming Tip</h3>
  <p>{getFarmingTip()}</p>
</div>


      </div>
    </div>
  );
}                        update this code 
