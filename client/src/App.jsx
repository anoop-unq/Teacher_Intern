// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';
// import TeachersPage from './pages/TeachersPage';
// import ProtectedRoute from './components/Layout/ProtectedRoute';


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route 
//               path="/dashboard" 
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/teachers" 
//               element={
//                 <ProtectedRoute>
//                   <TeachersPage />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TeachersPage from './pages/TeachersPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/dashboard" 
              element={
              
                  <Dashboard />
             
              } 
            />
            <Route 
              path="/teachers" 
              element={
              
                  <TeachersPage />
              
              } 
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Add catch-all route to prevent loops */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


