import './App.css'
import Header from './Header'
import WeatherFile from './WeatherFile'
import { useEffect, useState } from "react"



export default function App(props) {
    const units = 'metric';
    const WEATHER_END_POINT = 'https://api.openweathermap.org/data/2.5/weather?q=';
    
    const apiKey = import.meta.env.VITE_API_KEY;

    const [cities, setCity] = useState([]);
    const [inputText, setInputText] = useState("");
    const [mesureSytem, setMesureSystem] = useState("metric")
    const [uniqueKey, setUniqueKey] = useState("");
    const [onLoading, setOnLoading] = useState(true);

    const [weatherList, setWeatherList] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState({});


    function getKey() {
        const lenght = WeatherFile.length
        setUniqueKey(lenght)
    };
    async function fetchWeather() {



        const res = await fetch(WEATHER_END_POINT + inputText + '&units=' + mesureSytem + '&appid=' + apiKey);
        const json = await res.json();



        if (json["cod"] === 200) {
            setTimeout(setWeatherInfo(() => {
                weatherInfo.city = json.name;
                weatherInfo.temp = json.main;
                weatherInfo.main = (json.weather[0]).main
                weatherInfo.description = (json.weather[0]).description;
                weatherInfo.icon = (json.weather[0]).icon;
                weatherInfo.temperatureSytem = mesureSytem;
            }), 400)

            setWeatherList((prevValues) => {
                return [weatherInfo, ...prevValues];
            });

            setWeatherInfo({});

        } else {
            alert("Please try another city!")
            console.log(error);
        }

    };


    function handleChange(e) {
        setInputText(e.target.value)
    }
    function getCity() {
        fetchWeather();
        getKey()
        setInputText("");
    }
    function handleEnter(e) {
        if (e.code === 'NumpadEnter' || e.code === 'Enter') {
            getCity();
        };
    }

    function radioSelected(e) {
        console.log(e.target.value);
        setMesureSystem(e.target.value)
    }

    return (
        <>
            <Header />
            <div className="inputDiv">

                <label htmlFor='city' className='glassEfect glassLabel'> Type a city <input type="text" id="city" className='cityInput' placeholder='city' value={inputText} onChange={handleChange} onKeyDown={handleEnter} autoFocus /></label>

                <div className='temperatureMeasure'>
                    <label className='glassEfect glassLabel'>
                        <label htmlFor="cels" className='labelInLine'><input type="radio" name="mesureSytem" id="cels" value="metric" onChange={radioSelected} />Celsius</label>
                        <label htmlFor="fahr" className='labelInLine'><input type="radio" name="mesureSytem" id="fahr" value="imperial" onChange={radioSelected} />Fahrenheit</label>
                    </label>
                </div>


                <button type="submit" className='submiteButton glassEfect glassLabel' onClick={getCity}>Enter</button>

            </div>
            <div className='weatherContent'>
                {

                    weatherList.map(

                        (item) => (

                            <WeatherFile
                                key={uniqueKey}
                                id={item.index}
                                city={item.city}
                                main={item.main}
                                temp={(item.temp).temp}
                                description={item.description}
                                mesureSytem={item.temperatureSytem}

                            />
                        ))
                }
            </div>

        </>
    )
}

