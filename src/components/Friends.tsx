import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Friends = () => {
  const navigate = useNavigate();
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    (async () => {
      let fr = await getRecivedFriends();
      setFriends(fr);
    })();
  }, []);

  const gotochat = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="friendsList">
        {friends.map((elm: any) => (
          <div key={elm.friendID} id={elm.friendID}>
            <h2 className="text-xl">{elm.fullName}</h2>
            {elm.online ? (
              <p className="text-green-600">online</p>
            ) : (
              <p className="text-red-600">offline</p>
            )}
            <button onClick={() => gotochat(elm.chat)}>Chat</button>
            <br />
          </div>
        ))}
      </div>
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
