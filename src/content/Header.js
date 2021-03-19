import React from 'react';
import '@webpunk/circular-text';
import Earth from '../img/earth.png';

function Header() {
    return (
        <>
            <div className="header">
                <h1><circular-text
                    text=" * Aktualna pogoda * Aktualna pogoda"
                    radius="220">
                </circular-text></h1>
                <img src={Earth} alt="planeta ziemia z kosmosu" />
            </div>

        </>
    )
}

export default Header;