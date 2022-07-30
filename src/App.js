import NoteState from './context/NoteState';
import { BrowserRouter as Router,Link,Routes,Route } from 'react-router-dom'
import Nav from './components/Nav';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Nav/>
      <Routes>
        <Route exact path="/" key="home" element={<Home/>}/>
        <Route exact path="/about" key="about" element={<About/>}/>
        <Route exact path="/login" key="login" element={<Login/>}/>
        <Route exact path="/Register" key="Register" element={<Register/>}/>
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
