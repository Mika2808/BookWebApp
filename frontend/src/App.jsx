import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome'
import Books from './pages/Books'
import BookMore from './pages/BookReview'
import ToRead from './pages/ToRead'
import RandomBook from './pages/RandomBook'

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>}/>
        <Route path="/books/:id" element={<PrivateRoute><BookMore /></PrivateRoute>}/>
        <Route path="/to-read" element={<PrivateRoute><ToRead /></PrivateRoute>}/>
        <Route path="/random-book" element={<PrivateRoute><RandomBook /></PrivateRoute>}/>

      </Routes>
    </BrowserRouter>
  );
}
export default App;