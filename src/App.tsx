import './App.css';

import { Auth } from './Auth';
import Home from './Home.tsx';
import { Link, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import RequestPage from './RequestPage.tsx';

import FriendsPage from './FriendsPage.tsx';
import ChatPage from './ChatPage.tsx';
import axios from 'axios';

function App() {
  //   let [result ,setResult] = useState<RecordModel[] | null>(null)  ;
  //  useEffect(()=>{
  //   pb.collection("users").getFullList()
  //   .then(res=>{setResult(res)})
  //   .catch(err=>console.log(err))  ;
  //  },[]) ;
  // useEffect( ()=>{
  //   fetchData() ;
  // }, []) ;
  return (
    <div className="App">
      {/* <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>
        Give me a toast
      </button>
    </div>  */}

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/requests" element={<RequestPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>

      {/* <button><Link to="/auth">hello world</Link></button> */}
    </div>
  );
}

export default App;
