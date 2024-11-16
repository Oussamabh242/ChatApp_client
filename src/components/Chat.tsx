import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  let { id } = useParams();
  const chatid = id || '';
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    console.log('this');
    (async () => {
      const res = await fetchMessages(chatid as string);
      setMessages(res.messages);
      console.log(messages);
    })();
  }, []);
  const handleChage = (e: any) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    sendMessage(text, chatid);
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
  console.log(url, token);
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
