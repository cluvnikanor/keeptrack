import './app.css';
import ProjectsPage from './projects/ProjectsPage';
import Greeter from './Greeter'
import List from './List';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';

const fruits = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
];


function App() {


    return (
        <Router>
            <header className="sticky">
                <span className="logo">
                    <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
                </span >
                <NavLink to="/" className="button rounded">
                    <span className="icon-home"></span>
                    Home
                </NavLink>
                <NavLink to="/projects" className="button rounded">
                    Projects
                </NavLink>
            </header>
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
