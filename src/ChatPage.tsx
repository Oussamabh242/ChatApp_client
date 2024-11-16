import axios from 'axios';
import Chat from './components/Chat';
import SideBar from './components/SideBar';

const ChatPage = () => {
  return (
    <div className="flex">
      <SideBar />
      <Chat />
    </div>
  );
};

export default ChatPage;
