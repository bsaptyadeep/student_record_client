import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home';
import Add from './components/add';
import Update from './components/update';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/add" element={<Add/>} />
          <Route exact path="/update" element={<Update/>} />
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
