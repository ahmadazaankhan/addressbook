import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';





function App() {
return (
<>
    <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/settings' element={<Home/>}/>

        </Routes>
    </Router>
</>
);
}
export default App;