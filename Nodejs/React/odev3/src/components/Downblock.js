import Weather from './Weather.js'
import Days from './Days.js'
import { useState } from 'react'
import '../App.css';


function Downblock() {
  //sadece asagi blokta kullanacagim verileri saklamak için degisken olusturdum.
  //bu veri bana hangi elemente tiklandigini veriyor.
  const [selectedweather, setSelected] = useState();

  return (
    <div className='downblock'>
      <Weather selectedWeather={selectedweather}/>
      <Days setDay={setSelected}/>
    </div>
  )
}

export default Downblock