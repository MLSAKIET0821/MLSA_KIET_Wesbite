// import React, { createContext, useState, useEffect } from 'react';
// import * as jwtDecode from 'jwt-decode';

// export const AuthContext = createContext();


// const extractUserDataFromToken = (token) => {
//   try {
//     const decodedToken = jwtDecode.jwtDecode(token);
   
//     const userData = {
//       username: decodedToken.username,
//       email: decodedToken.email,
      
//     };
//     return userData;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [authToken, setAuthToken] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthToken(token);
//       const userData = extractUserDataFromToken(token);
//       if (userData) {
//         setIsLoggedIn(true);
//         setUser(userData);
//       } else {
        
//         console.log('Invalid token');
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     }
//   }, []);

//   const login = (userData) => {
//     const token = userData.accessToken;
//     localStorage.setItem('token', token);
//     setAuthToken(token);
//     const extractedUserData = extractUserDataFromToken(token);
//     setUser(extractedUserData);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthToken(null);
//     setUser(null);
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, authToken, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = React.useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
import React, { createContext, useState, useEffect } from 'react';
import * as jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const extractUserDataFromToken = (token) => {
  try {
    const decodedToken = jwtDecode.jwtDecode(token);
   
    const userData = {
      username: decodedToken.username,
      email: decodedToken.email,
    };
    return userData;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (token && expirationTime && Date.now() < expirationTime) {
      setAuthToken(token);
      const userData = extractUserDataFromToken(token);
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      } else {
        console.log('Invalid token');
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      console.log('Token expired or missing');
      logout();
    }
  }, []);

  const login = (userData) => {
    const token = userData.accessToken;
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000; 
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());

    setAuthToken(token);
    const extractedUserData = extractUserDataFromToken(token);
    setUser(extractedUserData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setAuthToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
