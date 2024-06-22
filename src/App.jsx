import { useState,useEffect } from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';
import LensBlurRoundedIcon from '@mui/icons-material/LensBlurRounded';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DehazeIcon from '@mui/icons-material/Dehaze';

function App() {

  setInterval(()=>{
    let newtime = new Date().toLocaleTimeString();
    setTIme(newtime);
  },1000)
  const [place, setPlace] = useState("lucknow")
  const [placeData,setplaceData]=useState(null);
  const [time,setTIme]=useState(new Date().toLocaleTimeString());
  
  const getWeatherData = async()=>{
    if(place && place.length>0){
      try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=489d5df7b9c715c5586179b2df4f4c8e`

        let res = await fetch(url);
        let data = await res.json();
        setplaceData(data);
        console.log(data);
      }
      catch(err){
        console.log(err);
      }
    }
  }

  useEffect(()=>{
    getWeatherData();
  },[])


  return (
    <>
      <div className='w-full h-screen p-2 text-white max-sm:flex flex-col items-center '>
        <div className='flex  w-full max-w-sm bg-[rgb(0,0,0,0.4)] mx-auto rounded-full m-4'>
          <input type="text" className=' bg-transparent w-full px-10 py-2 outline-none overflow-hidden' 
          placeholder='location'
          onChange={(e)=>{setPlace(e.target.value)}}
          />
          <button className='px-2 py-1 bg-red-500 rounded-full' onClick={getWeatherData}><SearchIcon/></button>
        </div>
        {
          placeData && <div className=' flex flex-row justify-between  w-full max-w-full px-4 max-sm:flex-col items-center'>
            <div className='w-full max-w-[400px] bg-[rgb(0,0,0,0.4)] h-[200px] rounded-lg px-3 py-2 my-2 gap-x-11 '>
            <div className='flex items-center ml-5 my-2 gap-x-2'>
              {
                placeData.weather[0].main=="Fog" &&
                <div className=' scale-[3] m-4 p-4'><LensBlurRoundedIcon/></div>
              }
              {
                placeData.weather[0].main=="Clouds" &&
                <div className=' scale-[3] m-4 p-4'><WbCloudyIcon/></div>
              }
              {
                placeData.weather[0].main=="Clear" &&
                <div className=' scale-[3] m-4 p-4'><CloudQueueIcon/></div>
              }
              {
                placeData.weather[0].main=="Smoke" &&
                <div className=' scale-[3] m-4 p-4'><VapingRoomsIcon/></div>
              }
              {
                placeData.weather[0].main=="Haze" &&
                <div className=' scale-[3] m-4 p-4'><DehazeIcon/></div>
              }
              <p className='text-[35px]'>{(placeData.main.temp-273.15).toFixed(1)} <span className='text-sm text-gray-400'>°C</span> </p>
            </div>
            <div className='flex items-center gap-x-3'>
              <p className=' text-[30px] px-5'>{placeData.name}</p>
              <p className='text-[25px] text-gray-400'>{placeData.weather[0].main}</p>
            </div>
            </div>
            <div className='w-full max-w-[400px] h-[200px] bg-[rgb(0,0,0,0.4)] rounded-lg px-3 py-2 my-2 gap-x-11 flex justify-center items-center'>
             <span className='text-[30px]'>{time}</span>
            </div>  
          </div>
        }
        {
          placeData && <div className='flex flex-row justify-evenly  w-full max-w-full mx-[-10px] bg-[rgb(0,0,0,0.4)] fixed bottom-0 left-0 max-sm:flex-col items-center '>
            <div className='w-[50%] mx-2 flex flex-col gap-y-2 px-5 py-2 max-sm:w-full'>
              <div className='flex justify-between'>
              <p>Wind speed</p>
              <p>{placeData.wind.speed} km/h</p>
              </div>
              <div className='flex justify-between'>
              <p>Temperature</p>
              <p>{(placeData.main.temp-273.15).toFixed(1)}</p>
              </div>
              <div className='flex justify-between'>
              <p>humidity</p>
              <p>{placeData.main.humidity}</p>
              </div>
              <div className='flex justify-between'>
              <p>Pressure</p>
              <p>{placeData.main.pressure}</p>
              </div>
            </div>

            <div className='w-[50%] mx-2 px-5 py-2 max-sm:w-full'>
              <div className='flex justify-between'>
              <p>Temperature Max</p>
              <p>{(placeData.main.temp_max-273.15).toFixed(1)}</p>
              </div>
              <div className='flex justify-between mb-5'>
              <p>visibility</p>
              <p>{placeData.visibility}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default App
