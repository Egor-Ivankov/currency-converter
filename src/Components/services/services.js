export default class ValuteService {

    _courseValuteURL = 'https://www.cbr-xml-daily.ru/daily_json.js';

    getValuteCourse = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not to fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    } 

    getValute = async (value) => {
        switch(value) {
            case 1:
                const USD = await this.getValuteCourse(this._courseValuteURL);
                return USD.Valute.USD.Value;
            case 2: 
                const EUR = await this.getValuteCourse(this._courseValuteURL);
                return EUR.Valute.EUR.Value;
            case 3:
                const GBP = await this.getValuteCourse(this._courseValuteURL);
                return GBP.Valute.GBP.Value;
            case 4:
                const JPY = await this.getValuteCourse(this._courseValuteURL);
                return JPY.Valute.JPY.Value;
            default:
                return null;
        }   
    }
}
