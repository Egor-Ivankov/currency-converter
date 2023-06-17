import React, {useState, useEffect} from 'react';
import ValuteService from '../services/services';
import './subHeader.scss';

const SubHeader = () => {
    const valute = new ValuteService();
    const [dollar, setDollar] = useState(0);
    const [euro, setEuro] = useState(0);
    const [pound, setPound] = useState(0);
    const [yen, setYen] = useState(0);


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

    useEffect(() => {
        getDollarValue();
        getEuroValue();
        getPoundValue();
        getYenValue()
    })

    return (
        <ul className='sub-header'>
            <li>$ = {dollar}₽</li>
            <li>€ = {euro}₽</li>
            <li>£ = {pound}₽</li>
            <li>¥ = {yen}₽</li>
        </ul>
    );
}

export default SubHeader;
