import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

const Friends = () => {
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    (async () => {
      let fr = await getRecivedFriends();
      setFriends(fr);
    })();
  }, []);

  return (
    <div className="flex-grow flex items-center justify-center">
      {friends.map((elm: any) => (
        <div key={elm.friendID}>
          <h2 className="text-xl">{elm.fullName}</h2>
          <button>Chat</button>
          <br />
        </div>
      ))}
    </div>
  );
};

const getRecivedFriends = async () => {
  const token = localStorage.getItem('accessToken');
  const res = await axios.get('http://localhost:3001/frinedship', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  console.log(res.data);
  return res.data;
};

export default Friends;
