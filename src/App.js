import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';

function App() {

  const [cidade, setCidade] = useState('London');
  const [data, setData] = useState({});
  const [busca, setBusca] = useState('');
  const [data2, setData2] = useState({});

  function Search(event){
    setBusca(event.target.value);
    console.log(busca);}

  useEffect(() => {
    async function Check2() {
      const data2 = await fetch(`http://api.weatherapi.com/v1/search.json?key=701bebe909794a5686125613230206&q=${busca}`);
      if (data2.status!==200){
      }
      else{
      const current2 = await data2.json();
      setData2(current2);
      console.log(current2);}
    }
    Check2();
  }, [busca]);

  useEffect(() => {
    async function Check() {
      try {
        const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=701bebe909794a5686125613230206&q=${cidade}&aqi=no`);
        if (data.status!==200){
          alert("Digite uma cidade válida");
        }
        else{
        const current = await data.json();
        setData(current);
        console.log(current);}
      } catch (error) {
        console.log("Digite uma cidade válida");
        // Handle the error as needed, e.g., set an error state or show a notification
      }
    }
    Check();
  }, [cidade]);

  function Handle(event){
    event.preventDefault();
    if (event.target[0].value !== ""){ 
      setCidade(event.target[0].value);}
    event.target[0].value = "";
    console.log(cidade);
  }  

return (
  <main className="w-screen text-center">
    <form className="mx-auto w-5/6 mb-20 sm:w-1/2 h-16 p-3" onSubmit={Handle}>
      <div className='flex-col bg-blue-300 mb-2 flex'>
        <input className="w-full bg-blue-300" type="text" value={busca} onChange={Search} placeholder="Digite a cidade" />
        {data2[0]?(
        <button onClick={()=>{
          setCidade(data2[0].name);
          setBusca('');
          setData2({});}} 
          className="w-full" type='button'>{data2[0].name}, {data2[0].region}</button>):("")}
        
        {data2[1]?(
        <button onClick={()=>{
          setCidade(data2[1].name);
          setBusca('');
          setData2({});}}  
        className="w-full" type='button'>{data2[1].name}, {data2[1].region}</button>):("")}
        
        {data2[2]?(
        <button onClick={()=>{
          setCidade(data2[2].name);
          setBusca('');
          setData2({});}}  
        className="w-full" type='button'>{data2[2].name}, {data2[2].region}</button>):("")}
      </div>
      <button className="border-solid inline-block border-2 px-2 border-black" type="submit">Pesquisar</button>
    </form>
    {data.location && data.current ? (
      <>
        <header>
          <h1 className="mt-10 text-3xl">
            {data.location.name}, {data.location.region}
          </h1>
        </header>
        <div className='bg-green-300 mt-3 w-5/6 sm:w-1/2 mx-auto rounded-lg'>
          <img className="w-32 text-center mx-auto" src={`http:${data.current.condition.icon}`} alt='imagem do tempo' />
          <h2 className="text-8xl">{data.current.temp_c}°C</h2>
          <h3 className='mt-12'>Sensação térmica</h3>
          <h3 className="text-3xl">{data.current.feelslike_c}°C</h3>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </main>
);}

export default App;