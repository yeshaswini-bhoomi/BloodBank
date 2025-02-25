import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donor from './pages/Dashboard/Donor';
import Hospital from './pages/Dashboard/Hospital';
import Organisation from './pages/Dashboard/Organisation';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/DOnation'
import Analytics from './pages/Dashboard/Analytics';
import DonorList from './pages/Admin/DonorList';
import HospitalList from './pages/Admin/HospitalList';
import OrganisationList from './pages/Admin/OrganisationList';
import AdminHomePage from './pages/Admin/AdminHomePage';

function App() {
  return (
      <>
      <ToastContainer/>
      <Routes>
      <Route path='/admin' 
        element={
          <ProtectedRoute>
            <AdminHomePage/>
          </ProtectedRoute>
        }
        />
      <Route path='/donor-list' 
        element={
          <ProtectedRoute>
            <DonorList/>
          </ProtectedRoute>
        }
        />
        <Route path='/hospital-list' 
        element={
          <ProtectedRoute>
            <HospitalList/>
          </ProtectedRoute>
        }
        />
        <Route path='/organisation-list' 
        element={
          <ProtectedRoute>
            <OrganisationList/>
          </ProtectedRoute>
        }
        />
        <Route path='/hospital' 
        element={
          <ProtectedRoute>
            <Hospital/>
          </ProtectedRoute>
        }
        />
        <Route path='/analytics' 
        element={
          <ProtectedRoute>
            <Analytics/>
          </ProtectedRoute>
        }
        />
        <Route path='/consumer' 
        element={
          <ProtectedRoute>
            <Consumer/>
          </ProtectedRoute>
        }
        />
        <Route path='/donation' 
        element={
          <ProtectedRoute>
            <Donation/>
          </ProtectedRoute>
        }
        />
        <Route path='/organisation' 
        element={
          <ProtectedRoute>
            <Organisation/>
          </ProtectedRoute>
        }
        />
        <Route path='/donor' 
        element={
          <ProtectedRoute>
            <Donor/>
          </ProtectedRoute>
        }
        />
        <Route path='/' 
        element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }
        //So homepage is protected. if the token is found we get the userid and by json verify function it will get decrypted and so we can access the homepage without a valid token we cannot access the homepage
        />
        <Route 
        path='/login' element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }
        />
        <Route 
        path='/register' element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
        
        }
        //login and register are wrapped with public route
        />
      </Routes>
      </>
   
    
  );
}

export default App;
