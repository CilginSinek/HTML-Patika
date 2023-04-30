import { useState, useEffect } from 'react'
import Info from './Info.js';
import { useCountry } from '../contexts/Countrycontex.js';

function Inweather({ selectedDay }) {
    const { tempture, setTempture } = useCountry()
    const [thisTemp, setThisTemp] = useState();


    useEffect(() => {
        if (selectedDay.length) {
            if (tempture === "K") {
                setThisTemp(parseFloat(selectedDay[0].data.main.temp.toFixed(2)));
            } else {
                setThisTemp(parseFloat((selectedDay[0].data.main.temp - 273.15).toFixed(2)));
            }
        }
    }, [selectedDay, tempture]);

    if (!selectedDay.length) {
        return <div>Loading...</div>;
    }

    return (

        <div className='weather'>
            <div>
                <div>icon</div>
                <h1>
                    {thisTemp}
                    <strong onClick={() => setTempture(tempture === "K" ? "C" : "K")}>
                        {tempture}
                    </strong>
                </h1>
                <div>
                    <Info selectedDay={selectedDay} />
                </div>
            </div>
        </div>
    )
}

export default Inweather