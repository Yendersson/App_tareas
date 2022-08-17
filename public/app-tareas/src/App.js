import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// components

import { Navbar } from './navbar/Navbar';
import { Index } from './pages/Index';
import { Task } from './pages/Tasks';
import { MyProfile } from './pages/MyProfile';



function App() {
  return (
    <div className="App">

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
