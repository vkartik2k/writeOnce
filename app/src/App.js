import React, { useState } from 'react'
import { auth} from './firebase-config';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from '@firebase/auth';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './components/routes/Dashboard'
import DigitalCertificate from './components/routes/DigitalCertificate'
import DraftPage from './components/routes/DraftPage'
import LandingPage from './components/routes/LandingPage';
import Loading from './components/Loading';

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

  // async function postData(url = '', data = {}) {
  //   // Default options are marked with *
  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }

  // postData('http://localhost:5050/encrypt', { text: "hello", signedBy: [{name: "Kartik Verma", email:"vkartik2k@gmail.com", isSigned: 'true'}], id:"123123dsfsdfdf"})
  // .then(data => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // })

  return (
    <Router>
      <UserContext.Provider value={user}>
        {console.log(user)}
        <LoginContext.Provider value={{logIn: signInWithGoogle, logOut}}>
          <div className="App">
            <Routes>
              <Route exact path='/' element={<LandingPage/>}></Route>
              <Route exact path='/dashboard' element={user? <Dashboard/>: <Navigate to="/"/> }></Route>
              <Route exact path='/certificate' element={user? <DigitalCertificate/> :<Navigate to="/"/>}></Route>
              <Route exact path='/draft/:id' element={user ?<DraftPage/>: <Navigate to="/"/>}></Route>
            </Routes>
          </div>
        </LoginContext.Provider>
      </UserContext.Provider>
    </Router>
  )
}

export default App