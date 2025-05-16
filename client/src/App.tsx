// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
// import { Dashboard } from './pages/dashboard';
// import { Auth } from './pages/auth';
// import { FinancialRecordsProvider } from './contexts/financial-record-context';
// import { SignedIn, UserButton } from '@clerk/clerk-react';
// function App() {
//   return( 
//   <Router>
//     <div className="app-container">
//       <div className="navbar">
//           <Link to="/"> Dashboard </Link>
//           <SignedIn>
//             <UserButton />
//          </SignedIn>

//       </div>
//         <Routes>
//           <Route path="/" element={<FinancialRecordsProvider><Dashboard /></FinancialRecordsProvider>} />
//           <Route path="/auth" element={<Auth />} />
//         </Routes>
//     </div>
//   </Router>
//   );
// }

// export default App

import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, SignedOut, UserButton, RedirectToSignIn } from '@clerk/clerk-react';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/"> Dashboard </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <FinancialRecordsProvider>
                    <Dashboard />
                  </FinancialRecordsProvider>
                </SignedIn>
                <SignedOut>
                  {/* Redirect to your custom auth page */}
                  <RedirectToSignIn redirectUrl="/auth" />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
