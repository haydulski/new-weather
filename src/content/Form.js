import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryOption from './CountryOption'
import CityOption from './CityOption'
import WeatherPanel from './WeatherPanel'

function FormSelection() {
    const [cont, setCont] = useState();
    const [userId] = useState(0);
    const [answer, setAnswer] = useState({ country: null, city: ['cities'], choosenCity: null });
    const [weather, setWeather] = useState({});

    const getCountries = async function () {
        let url = process.env.REACT_APP_COUNTRIES_URL

        try {
            let { data } = await axios.get(url);
            let countriesList = [];
            let countriesArray = data.data
            countriesArray.forEach(count => {
                countriesList.push(count.name)
            })
            countriesList.sort();
            setCont(countriesList)
        } catch (error) {
            console.warn('błąd zapyatnia o kraje')
        }


    };
    const getCities = async function (country = "Poland") {
        let url2 = process.env.REACT_APP_CITIES_URL
        if (country === null) {
            setAnswer({ ...answer, city: ['wybierz miasto'] })
        } else {
            try {
                let { data } = await axios.post(url2,
                    {
                        "limit": 40,
                        "order": "asc",
                        "orderBy": "name",
                        "country": country,

                    }, { timeout: 1000 });

                let citiesArray = []
                data.data.forEach(country => citiesArray.push(country.city))
                setAnswer({ ...answer, city: citiesArray })
            } catch (error) {
                setAnswer({ ...answer, city: ['brak miast'] })
                setWeather({})
                console.warn('błąd zapytania o miasta')
                return
            }
        }
    }
    const getWeather = async function () {
        let url3 = process.env.REACT_APP_WEATHER_URL;
        let api = process.env.REACT_APP_WEATHER_API;
        let call = `${url3}weather?q=${answer.choosenCity}&appid=${api}&units=metric`

        try {
            const { data } = await axios.get(call);

            setWeather(data.main)
        } catch (error) {
            console.log(error);
            setWeather({})
            return
        }


    }
    const handleChange = (e) => {
        setAnswer({ ...answer, country: e.target.value, choosenCity: null });
    }
    const handleCity = (e) => {
        setAnswer({ ...answer, choosenCity: e.target.value });
        setWeather({})
    }
    const formSubmit = (e) => {
        e.preventDefault()
        getWeather();
    }

    useEffect(() => { getCountries() }, [userId])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getCities(answer.country) }, [answer.country])


    return cont ? (

        <>
            <div className="section__main">
                <form action="#" onSubmit={formSubmit}>
                    <select name="country" id="country" onChange={handleChange}>
                        <CountryOption countries={cont} />
                    </select>
                    <select name="city" id="city" disabled={answer.country ? false : true} onChange={handleCity} onClick={handleCity}>
                        <CityOption cities={answer.city} />
                    </select>
                    <input type="submit" value="Sprawdź pogodę" disabled={answer.choosenCity ? false : true} />
                </form>
                <WeatherPanel weather={weather} city={answer.choosenCity} />
            </div>
        </>
    ) :
        <>
            <h1>Ładowanie</h1>
        </>
}

export default FormSelection