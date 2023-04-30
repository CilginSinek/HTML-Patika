import { useCountry } from '../contexts/Countrycontex'
// import Datalisting from '../myfuncs/Datalisting'
import getWeekdayFromDate from '../myfuncs/GetDay'
import '../App.css';

function Days({ setDay }) {

    // contexti hava durumlarini ve secilen havadurumunun kontrolunu aldim.
    const { weatherlist, tempture, setTempture } = useCountry()

    // listemdeki verilere gore hepsini yazdirdim.
    const weatherItems = weatherlist.map(({ date, data }) => {
        const temperatureInCelsius = (tempture === "C") ? (parseFloat((data.main.temp - 273.15).toFixed(2))) : data.main.temp;
        return (
            <div onClick={() => setDay(data.dt)} key={data.dt}>
                <h3>{getWeekdayFromDate(date)}</h3>
                <p>{data.weather[0].description}</p>
                <p>{temperatureInCelsius} <strong onClick={()=>setTempture(tempture === "K" ? "C" : "K")}>{tempture}</strong></p>
                <p>{date.toLocaleString().slice(0, -9).substring(0, date.toLocaleString().length - 6)}</p>
            </div>
        )
    });

    return (
        <div className='days'>
            {weatherItems}
        </div>
    )
}

export default Days