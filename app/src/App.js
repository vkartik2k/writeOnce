import React, { useState } from 'react'
import { auth } from './firebase-config';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from '@firebase/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/routes/Dashboard'
import DigitalCertificate from './components/routes/DigitalCertificate'
import DraftPage from './components/routes/DraftPage'

const provider = new GoogleAuthProvider();
export const UserContext = React.createContext();
export const LoginContext = React.createContext();

function App() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => setUser(currentUser))

  let signInWithGoogle= () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      setUser(result.user)
    }).catch((error) => console.log(error.message));
  }

  let logOut = async () => await signOut(auth);

  return (
    <UserContext.Provider value={user}>
      <LoginContext.Provider value={{logIn: signInWithGoogle, logOut}}>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path='/' element={<Dashboard/>}></Route>
              <Route exact path='/certificate' element={<DigitalCertificate/>}></Route>
              <Route exact path='/draft' element={<DraftPage/>}></Route>
            </Routes>
          </div>
        </Router>
      </LoginContext.Provider>
    </UserContext.Provider>
  )
}

export default App