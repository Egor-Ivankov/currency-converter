import React, {useState, useEffect} from 'react';
import ValuteService from '../services/services';
import swap from '../../img/swap.png';
import './subHeader.scss';

const SubHeader = () => {
    const valute = new ValuteService();
    const [dollar, setDollar] = useState(0);
    const [euro, setEuro] = useState(0);
    const [pound, setPound] = useState(0);
    const [yen, setYen] = useState(0);
    const [selectedValute, setSelectedValute] = useState(null);
    const [input, setInput] = useState('');
    const [currency, setCurrency] = useState('');


    const getValuteCourse = async (value) => {
        switch(value) {
            case 1: 
                const dollar = await valute.getValute(1);
                setDollar(dollar.toFixed(2));
                break;
            case 2:
                const euro = await valute.getValute(2);
                setEuro(euro.toFixed(2));
                break;
            case 3:
                const pound = await valute.getValute(3);
                setPound(pound.toFixed(2));
                break;
            case 4:
                const yen = await valute.getValute(4);
                setYen(yen.toFixed(2));
                break;
            default:
                return null;
        }
    }

    const itemRefs = [];

    const setRef = (ref) => {
        itemRefs.push(ref);
    }

    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('selected'));
        itemRefs[id].classList.add('selected');
    }

    useEffect(() => {
        for (let i = 1; i < 5; i++) {
            getValuteCourse(i);
        }
    })

    const valutesSimbol = ['$', '€', '£', '¥'];
    const valutes = [dollar, euro, pound, yen];
    const elements = valutes.map((item, i) => {
        return <li 
                    key={i}
                    ref={setRef}
                    onClick={() => {
                        focusOnItem(i)
                        setSelectedValute(valutesSimbol[i])
                    }}
                    >{valutesSimbol[i]} = {item}₽</li>
    });

    const onCurrency = () => {
        if (input >= 1) {
            switch(selectedValute) {
                case '$': 
                        setCurrency((input * dollar).toFixed(2) + '₽');
                    break;
                case '€':
                        setCurrency((input * euro).toFixed(2) + '₽');
                    break;
                case '£':
                        setCurrency((input * pound).toFixed(2) + '₽');
                    break;
                case '¥':
                        setCurrency((input * yen).toFixed(2) + '₽');
                    break;
                default: 
                    setCurrency('Please, select a currency');
                } 
        } else {
            setCurrency('Please enter a number greater than 0');
        }
    }

    return (
        <>
            <ul className='sub-header'>
                {elements}
            </ul>

            <div className='calculator'>
                <h2>Currency calculator</h2>
                <div className="calc-container">
                    <div className='valute'>
                        <p>Selected currency: <b>{selectedValute ? selectedValute : 'none'}</b></p>
                        <input type="number" placeholder=' Enter your valute value'value={input} onChange={e => setInput(e.target.value)}/>
                    </div>
                    <button onClick={onCurrency}><img src={swap} alt="swap-icon" /></button>
                    <div className='valute'>
                        <p>Outcome</p>
                        <span>{currency}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubHeader;
