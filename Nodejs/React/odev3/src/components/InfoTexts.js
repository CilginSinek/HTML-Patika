import React from 'react'
import { tempfunc } from '../myfuncs/tempfunc'
import { useCountry } from '../contexts/Countrycontex'

function InfoTexts({selectedDay, text, textCode}) {
    const { tempture, setTempture } = useCountry();
    return (
        <p>
            {text}: {tempfunc(selectedDay[0].data.main[textCode], tempture)}
            <strong onClick={() => setTempture(tempture === "K" ? "C" : "K")}>
                {tempture}
            </strong>
        </p>
    )
}

export default InfoTexts