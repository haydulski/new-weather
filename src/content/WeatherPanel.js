import React from 'react';

const WeatherPanel = function ({ weather, city }) {

    const { feels_like, humidity, pressure, temp } = weather;
    return weather.humidity ? (
        <>
            <div className="weather-panel">

                <div className="number">
                    <h2>Pogoda w: {city ? city : ''}</h2>
                    <p className="separator"></p>
                    <p className="temp">Temepartura: <b>{temp}&deg;C</b></p>
                    <p className="temp-fill">Temepartura odczuwalna: <b>{feels_like}&deg;C</b></p>
                    <p className="pressure">Ciśnienie: <b>{pressure}hPa</b></p>
                    <p className="humidy">Wilgotność: <b>{humidity}%</b></p>
                </div>
            </div>
        </>
    ) : (
        <><div className="weather-panel"></div></>
    )
}

export default WeatherPanel