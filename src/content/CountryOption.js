import React from 'react';


const CountryOption = function ({ countries }) {

    return (
        <>
            <option >wybierz kraj</option>
            {countries.map((country, index) => {
                return <option key={index} value={country}>{country}</option>
            })}

        </>
    )
}
export default CountryOption