import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// components

// COMPONENTS
import { Navbar } from './navbar/Navbar';

// Pages
import { Index } from './pages/Index';
import { Task } from './pages/Tasks';
import { MyProfile } from './pages/MyProfile';

function App() {
  return (
    <div className="App vh-100">

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route index element={<Index />} />
          <Route path='task' element={<Task />} />
          <Route path='profile' element={<MyProfile />} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
