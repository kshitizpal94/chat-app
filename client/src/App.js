import {Routes, Route, Navigate} from 'react-router-dom';
import Register from './Pages/Register';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap';
import { ChatContextProvider } from './Context/ChatContext';
import './App.css'
import NavBar from './Components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import PotentialChats from './Components/Chat/PotentialChats';
function App() {
  const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user = {user}>
      <NavBar/>
      <Container>
        <Routes>
          <Route exact path='/' element={user ? <Chat/> : <Login/>}></Route>
          <Route exact path='/register' element={user ? <Chat/> : <Register/>}></Route>
          <Route exact path='/login' element={user ? <Chat/> : <Login/>}></Route>
          <Route exact path='/newchat' element={user ?<PotentialChats/> : <Login/>}></Route>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
