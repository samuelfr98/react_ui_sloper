import React from 'react'
import landingPageGroup from '../assets/landingPageGroupResized.svg';
import SVG from 'react-inlinesvg';

const Landing = () => {

    return (
        <div className='LandingPageGroup'>
            <SVG src={landingPageGroup}
                height="46vh"
                width="44vw"
                className="LandingLogo"
            />
        </div>
    )
}

export default Landing