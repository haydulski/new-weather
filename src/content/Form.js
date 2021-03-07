import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryOption from './CountryOption'

function FormSelection() {
    const [cont, setCont] = useState();
    const [userId, setid] = useState(0);

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
    useEffect(() => { getCountries() }, [userId])


    return cont ? (

        <>
            <form action="#">
                <select name="country" id="country">
                    <CountryOption countries={cont} />
                </select>
                <select name="city" id="city">
                    <option value="Poland">Warsaw</option>
                    <option value="Russia">Moscow</option>
                </select>
            </form>
        </>
    ) :
        <>
            <h1>Ładowanie</h1>
        </>
}

export default FormSelection