import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const Reqeusts = ()=> {

  let [requests , setRequests] = useState([])

  useEffect(()=>{
    (async ()=>{
      let req = await getRecivedRequests()   
      setRequests(req)
    })()
  }, [])
  
  return (
  <div className="flex-grow flex items-center justify-center">
    {requests.map((elm:any) => (
      <div key={elm.sender.id} id={elm.sender.id} >
        <h2 className="text-xl font-semibold">{elm.sender.fullName}</h2>
        <span>{elm.date}</span><br/>
        <button className="border p-2 rounded">
          Accept
        </button>
        <button className="border p-2 rounded">Refuse</button>
      </div>
    ))}
  </div>
);

}
const getRecivedRequests = async ()=>{

  const token = localStorage.getItem("accessToken") ;
  const res = await axios.get('http://localhost:3001/request',  {
    headers: {
        'Authorization': "Bearer "+token // Replace with your token
    }
  });
  console.log(res.data)
  return res.data ; 
}



export default Reqeusts; 
