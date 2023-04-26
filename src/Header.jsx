import { useEffect, useState } from 'react';
import './App.css'
export default function Header() {
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        setInterval(() => { setDate(new Date()), 1000 })
    },
        []);

    return (
        <div className='header glassEfect'>
            <h1>Weather App</h1>
            <p><span>{date.toLocaleTimeString()}</span></p>
        </div>
    )
}
