export default class ValuteService {

    _courseValuteURL = 'https://www.cbr-xml-daily.ru/daily_json.js';

    getValuteCourse = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not to fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    } 

    getDollar = async () => {
        const res = await this.getValuteCourse(this._courseValuteURL);
        return res.Valute.USD.Value;
    }

    getEuro = async () => {
        const res = await this.getValuteCourse(this._courseValuteURL);
        return res.Valute.EUR.Value;
    }

    getPound = async () => {
        const res = await this.getValuteCourse(this._courseValuteURL);
        return res.Valute.GBP.Value;
    }

    getYen = async () => {
        const res = await this.getValuteCourse(this._courseValuteURL);
        return res.Valute.JPY.Value;
    }
}
