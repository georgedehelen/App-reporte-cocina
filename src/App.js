import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from './pages/Inventory';
import MenuDaily from './pages/MenuDaily';
import SalesReport from './pages/SalesReport';
import DailyReport from './pages/DailyReport';
import NavigationBar from './components/Navbar';

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Inventory />} />
                <Route path="/menu" element={<MenuDaily />} />
                <Route path="/sales" element={<SalesReport />} />
                <Route path="/report" element={<DailyReport />} />
            </Routes>
        </Router>
    );
}

export default App;
