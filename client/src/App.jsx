import { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Info from './components/Info';
import Posts from './components/Posts';
import Todos from './components/Todos';
import NotFound from './components/NotFound';

export const CurrentUserContext = createContext();


function ProtectedRouteHome({ children }) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!currentUser || !currentUser.id) {
    return <Navigate to="/Login" replace />;
  }
  return children;
}


function App() {
  // const userInLocalStorage = JSON.parse(localStorage.getItem('currentUser')) || {};
  const userInLocalStorage={};
  const [currentUser, setCurrentUser] = useState(userInLocalStorage);
  const [albumTitle, setAlbumTitle] = useState('');

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Navigate to="Login" />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />   
            <Route
              path="/users/:id/Home"
              element={
                <ProtectedRouteHome>
                  <Home />
                </ProtectedRouteHome>
              }
            >
              <Route path="Info" element={<Info />} />
              <Route path="Todos" element={<Todos />} />
              <Route path="Posts" element={<Posts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
