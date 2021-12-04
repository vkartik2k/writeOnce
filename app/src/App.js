import React, { useState } from 'react'
import { auth} from './firebase-config';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from '@firebase/auth';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './components/routes/Dashboard'
import DigitalCertificate from './components/routes/DigitalCertificate'
import DraftPage from './components/routes/DraftPage'
import LandingPage from './components/routes/LandingPage';

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
              <Route exact path='/' element={<LandingPage/>}></Route>
              <Route exact path='/dashboard' element={user? <Dashboard/>: <Navigate to="/"/> }></Route>
              <Route exact path='/certificate' element={user? <DigitalCertificate/> :<Navigate to="/"/>}></Route>
              <Route exact path='/draft/:id' element={<DraftPage/>}></Route>
            </Routes>
          </div>
        </Router>
      </LoginContext.Provider>
    </UserContext.Provider>
  )
}

export default App