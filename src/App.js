import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import MainPage from './components/MainPage';
import { useState } from 'react';

const App = () => {

    const[bucket,setBucket] = useState('a');

    const handleBucket = (buc) => {
        setBucket(buc);
    }

    return (
        <div className="App">
            <MyNavbar/>
            <Header onBucketChange={handleBucket}/>
            <BrowserRouter>
				<Routes>
                    <Route path="/" element={<MainPage bucket={bucket}/>}/>
				</Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
