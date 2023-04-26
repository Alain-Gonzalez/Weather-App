import { useState } from "react"

export default function Input() {
    const [city, setCity] = useState("");
    const [inputText, setInputText] = useState("");

    function getCity() {

        setCity(inputText);
        console.log(city);
    }

    function handleChange(e) {
        setInputText(e.target.value);
        console.log(inputText);
    }

    return <div className="inputDiv">
        <label> Type a city <input type="text" value={inputText} onChange={handleChange}/></label>
        
        <label htmlFor="cels"><input type="radio" name="celsius" id="cels" />Celsius</label>
        <label htmlFor="fahr"><input type="radio" name="fahrenheit" id="fahr" />Fahrenheit</label>
      
       <button type="submit" onClick={getCity}>Enter</button>
  
    </div>

};