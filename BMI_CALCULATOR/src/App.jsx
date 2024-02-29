import { useState } from 'react'
import './App.css'

function App() {
  const [height, setHeight] = useState("");
  const [weight,setWeight]=useState("");
  const[bmi,setBmi]=useState(null);
  const [status,setStatus]=useState("");
  const[errorMessage,setErrorMessage]=useState("");
  function calculatebmi(){
    const isvheight=/^\d+$/.test(height);
    const isvweight=/^\d+$/.test(weight);
    if(isvheight && isvweight){
     const v=height/100;
      const bmiv=weight/(v*v);
      setBmi(bmiv.toFixed(2));
      if(bmiv<18.5) setStatus("UnderWeight");
      else if(bmiv>=18.5 && bmiv<24.9) setStatus("NormalWeight");
      else if(bmiv>=25 && bmiv<29.9) setStatus("OverWeight");
      else setStatus("Obese");
      setErrorMessage("")
    }
    else{
      setBmi(null);
      setStatus("");
      setErrorMessage("please provide valid height and weight");
    }
  }
  return (
    <>
     <div className="bmi-calculator">
       <div className='box'>
       </div>
       <div className='data'>
        <h1>BMI CALCULATOR</h1>
        {errorMessage && <p class="error">{errorMessage}</p>}
        <div className="input-container">
        <label htmlFor="height">Height:</label>
        <input type="text" id="height" onChange={(e)=>setHeight(e.target.value)}></input>
        </div>
        <div className="input-container">
        <label htmlFor="weight" id="weight" >Weight:</label>
        <input type="text" onChange={(e)=>setWeight(e.target.value)} />
        </div>
        <button onClick={calculatebmi}>Calculate BMI</button>
       { bmi!==null && <div className="result">
        <p>Your BMI is: {bmi}</p>
        <p>Status: {status}</p>
       </div>}
       </div>
     </div>
    </>
  )
}

export default App
