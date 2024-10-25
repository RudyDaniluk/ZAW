import React, { useEffect, useState } from 'react';

const App = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=4fd89fd989b504bf4cb7e3d8beace553&lang=pl&units=metric')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setWeather(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="loading-message">Ładowanie danych...</p>;
    if (error) return <p className="error-message">Błąd: {error.message}</p>;

    return (
        <div className="weather-info">
            <h2>Pogoda w {weather.name}</h2>
            <ul className="weather-details">
                <li>Temperatura: {weather.main.temp} °C</li>
                <li>Opis: {weather.weather[0].description}</li>
                <li>Wilgotność: {weather.main.humidity}%</li>
                <li>Wiatr: {weather.wind.speed} m/s</li>
            </ul>
        </div>
    );
};

export default App;
