import iller from '../contexts/iller.json'
// isimlere ulasmaya usendigimden json kullandım.
import { useCountry } from '../contexts/Countrycontex.js'
// secilen ili kaydetmek icin context kullandim.

function Upperblock() {
    const { setCountry, country } = useCountry()
    return (
        <div className='selection arena'>
            <select className='Selection' onChange={(e) => setCountry(e.target.value)} value={country}>
                {iller.map((il) => (
                    <option key={il.plaka} value={il.il_adi}>{il.il_adi}</option>
                ))}
            </select>
        </div>
    )
}

export default Upperblock