import { useEffect, useState } from 'react';
import { useCountry } from '../contexts/Countrycontex.js'
import Inweather from './Inweather.js';

function Weather({ selectedWeather }) {
  const { weatherlist } = useCountry();
  const [selectedDay, setSelectedDay] = useState();
  //selectedDay secilen gunun datasını tutuyor.

  useEffect(() => {
    setSelectedDay(weatherlist.filter(({ data, date }) => data.dt === selectedWeather));
    //secilen gunu bulup degiskene atiyor
    console.log(weatherlist.filter(({ data, date }) => data.dt === selectedWeather));
  }, [selectedWeather, weatherlist])


  if (selectedWeather === undefined) {
    //secilen gun var mi yok mu sorgusu
    return (
      <>
        <Inweather selectedDay={weatherlist}/>
      </>
    )
  } else {
    return (
      <>
        <Inweather selectedDay={selectedDay}/>
      </>
    )
  }


}

export default Weather