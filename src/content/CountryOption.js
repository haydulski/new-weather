import React from 'react';


const CountryOption = function ({ countries }) {

    return (
        <>
            {countries.map((country, index) => {
                return <option key={index} value={country}>{country}</option>
            })}

        </>
    )
}
export default CountryOption