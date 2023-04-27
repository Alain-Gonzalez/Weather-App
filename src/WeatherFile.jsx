import { useEffect, useState } from 'react'
import { IconTemperature, IconTemperatureCelsius, IconTemperatureFahrenheit } from '@tabler/icons-react';
import { IconSun as Clear } from '@tabler/icons-react'

export default function WeatherApp(props) {
    const [infoHover, setInfoHover] = useState(true)

    let system = "";

    function displayContent() {
        setInfoHover(false)

    }
    function hiddeContent() {
        setInfoHover(true)

    }

    if (props.name === "Clear") {
        return <Clear />
    }


    function getIcon() {
        if (props.mesureSytem === "metric") {
            system = <IconTemperatureCelsius />;
            return system
        } else if (props.mesureSytem === "imperial") {
            system = <IconTemperatureFahrenheit />;
            return system
        };
    };


    return <div className={"weatherFile  " + props.main}  >

        <div className="weatherFileText" onMouseOver={displayContent} onMouseLeave={hiddeContent}  >
            <h2>{props.city}</h2>
            <IconTemperature className='mainInfo' />
            <p className='mainInfo' >{props.temp}<i className='icon'>{getIcon()}</i></p>
            <p className='info' hidden={infoHover}>{props.description}</p>

        </div>

    </div>


}
