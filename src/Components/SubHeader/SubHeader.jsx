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


    const getDollarValue = async () => {
        const res = await valute.getDollar();
        setDollar(res.toFixed(2));
    }

    const getEuroValue = async () => {
        const res = await valute.getEuro();
        setEuro(res.toFixed(2));
    }
    
    const getPoundValue = async () => {
        const res = await valute.getPound();
        setPound(res.toFixed(2));
    }

    const getYenValue = async () => {
        const res = await valute.getYen();
        setYen(res.toFixed(2));
    }

    const itemRefs = [];

    const setRef = (ref) => {
        itemRefs.push(ref)
    }

    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('selected'))
        itemRefs[id].classList.add('selected')
    }

    useEffect(() => {
        getDollarValue();
        getEuroValue();
        getPoundValue();
        getYenValue();
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
        switch(selectedValute) {
            case '$': 
                if (input >= 1) {
                    setCurrency((input * dollar).toFixed(2) + '₽');
                } else {
                    setCurrency('Please select a value greater than zero')
                }
                break;
            case '€':
                if (input >= 1) {
                    setCurrency((input * euro).toFixed(2) + '₽');
                } else {
                    setCurrency('Please select a value greater than zero')
                }
                break;
            case '£':
                if (input >= 1) {
                    setCurrency((input * pound).toFixed(2) + '₽');
                } else {
                    setCurrency('Please select a value greater than zero')
                }
                break;
            case '¥':
                if (input >= 1) {
                    setCurrency((input * yen).toFixed(2) + '₽');
                } else {
                    setCurrency('Please select a value greater than zero')
                }
                break;
            default: 
                setCurrency('Please, select a currency')
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
