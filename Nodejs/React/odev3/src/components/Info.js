import React from 'react'
import InfoTexts from './InfoTexts';

function Info({ selectedDay }) {
  return (
    <>
      <div>
        <InfoTexts selectedDay={selectedDay} text={"feels like"} textCode={"feels_like"} />
        <InfoTexts selectedDay={selectedDay} text={"Maximum Temperature"} textCode={"temp_max"} />
        <InfoTexts selectedDay={selectedDay} text={"Minimum Temperature"} textCode={"temp_min"} />
      </div>
      <div>
        {selectedDay[0].data.rain && selectedDay[0].data.rain['3h'] && <p>Rain (3h): {selectedDay[0].data.rain['3h']} mm</p>}
        {selectedDay[0].data.rain && selectedDay[0].data.rain['1h'] && <p>Rain (1h): {selectedDay[0].data.rain['1h']} mm</p>}
        <p>
          humidity: {selectedDay[0].data.main.humidity}%
        </p>
        <p>
          wind: {selectedDay[0].data.wind.speed}-{selectedDay[0].data.wind.gust} m/sec
        </p>

      </div>

    </>
  )
}

export default Info