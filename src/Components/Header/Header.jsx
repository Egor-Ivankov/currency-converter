import React, {useState} from 'react';
import './header.scss'
import moon from '../../img/moon.png';
import sun from '../../img/sun.png'
const Header = () => {
    const [light, setLight] = useState(true);

    const onSelectLight = () => {
        setLight(!light);
    }

    return (
        <div className='header'>
            <h1>Currency converter</h1>
            <img className="light-icon" onClick={onSelectLight} src={light ? sun : moon} alt="light-icon" />
        </div>
    );
}

export default Header;
