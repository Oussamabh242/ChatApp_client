import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useSocket } from '../context/socketContext';

const SOCKET_URL = 'http://localhost:3322?token=';

const Chat = () => {
  const { socket } = useSocket();
  let { id } = useParams();
  const chatid = id || '';
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  //const [socket , setSocket] = useState(null);
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!socket) return;
    console.log(socket.id);
    socket.on('hello', (message) => {
      console.log(message);
    });
    //const socket = io(SOCKET_URL+token);

    (async () => {
      const res = await fetchMessages(chatid as string);
      setMessages(res.messages);
      console.log(messages);
    })();
  }, [socket]);
  const handleChage = (e: any) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    socket?.emit('createSss', {
      chatid: id,
      text: text,
    });
    setMessages([...messages, { text: text, sender: { fullName: 'you' } }]);
    console.log('some');
  };

  return (
    <div>
      <input onChange={handleChage}></input>
      <button onClick={handleClick}>Send</button>
      <div className="allmessages">
        {messages.map((elm: any) => (
          <div className="w">
            <div className="block">sender : {elm.sender.fullName} </div>
            <div className="block">text : {elm.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

async function fetchMessages(chatid: string) {
  const token = localStorage.getItem('accessToken');
  const url = 'http://localhost:3001/messages/' + chatid;

  console.log('somethin', url, token);
  const res = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  console.log(res.data);
  return res.data;
}
async function sendMessage(text: string, chatid: string) {
  const token = localStorage.getItem('accessToken');
  const url = 'http://localhost:3001/messages/';
  const res = await axios.post(
    url,
    {
      chatid: chatid,
      text: text,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  console.log(res.data);
  return res.data;
}

export default Chat;
