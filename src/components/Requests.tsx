import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

const Reqeusts = () => {
  let [requests, setRequests] = useState([]);
  let [users, setUsers] = useState([]);

  let [id, setId] = useState('');
  const handleInputChange = async (e: any) => {
    setId(e.target.value);
    const res = await searchUsers(id);
    setUsers(res);
  };

  useEffect(() => {
    (async () => {
      let req = await getRecivedRequests();
      setRequests(req);
    })();
  }, []);

  async function handleSend() {
    console.log(id);
    await searchUsers(id);
  }

  return (
    <div className="flex-grow flex ">
      <div className="searching">
        <div className="searchform text-red-500">
          <label className="text-xl text-red-900" htmlFor="fullName">
            Full Name:
          </label>
          <input
            id="fullName"
            className="border-x-4 border-black"
            type="text"
            value={id}
            onChange={handleInputChange}
          />
          <button className="text-white border-2" onClick={handleSend}>
            Send
          </button>
        </div>
        <div>
          {users.map((elm: any) => (
            <div id={elm.id} key={elm.id}>
              <h3>{elm.fullName}</h3>
              <button onClick={() => SendReqeust(elm.id)}>Send</button>
            </div>
          ))}
        </div>
      </div>

      <div className="recived_requests">
        {requests.map((elm: any) => (
          <div key={elm.sender.id} id={elm.sender.id}>
            <h2 className="text-xl font-semibold">{elm.sender.fullName}</h2>
            <span>{elm.date}</span>
            <br />
            <button
              className="border p-2 rounded"
              onClick={() => respondReq(elm.id, true)}
            >
              Accept
            </button>
            <button
              className="border p-2 rounded"
              onClick={() => respondReq(elm.id, false)}
            >
              Refuse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SendReqeust = async (id: string) => {
  const token = localStorage.getItem('accessToken');
  const data = {
    reciver: id,
  };
  const res = await axios.post('http://localhost:3001/request', data, {
    headers: {
      Authorization: 'Bearer ' + token, // Replace with your token
    },
  });
  console.log(res.data);
  return res.data;
};

const getRecivedRequests = async () => {
  const token = localStorage.getItem('accessToken');
  const res = await axios.get('http://localhost:3001/request', {
    headers: {
      Authorization: 'Bearer ' + token, // Replace with your token
    },
  });
  console.log(res.data);
  return res.data;
};

const searchUsers = async (id: string) => {
  const token = localStorage.getItem('accessToken');
  console.log('http://localhost:3001/request/search/' + id);
  const res = await axios.get('http://localhost:3001/request/search/' + id, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  console.log(res.data);
  return res.data;
};

const respondReq = async (id: string, resp: boolean) => {
  const token = localStorage.getItem('accessToken');
  const res = await axios.put(
    'http://localhost:3001/request',
    {
      reqid: id,
      response: resp,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  console.log(res);
};

export default Reqeusts;
