import React from 'react';


const CityOption = function ({ cities }) {

    return (
        <>

            {cities.map((city, index) => {
                return <option key={index} value={city}>{city}</option>
            })}

        </>
    )
}
export default CityOption