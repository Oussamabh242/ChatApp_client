import axios from "axios";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

const Reqeusts = ()=> {
  let req =getRecivedRequests() ; 
  
  return (
    <>
      {req}
      <h1>SUP</h1>
    </>
  )


}
const getRecivedRequests = async ()=>{
  const token = localStorage.getItem("accessToken") ;
  const res = await axios.get('http://localhost:3001/requests/recived',  {
    headers: {
        'Authorization': token // Replace with your token
    }
  });
  console.log(res.data)
  return res.data ; 
}



export default Reqeusts; 
