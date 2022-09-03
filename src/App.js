import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Footer from './components/Shared/Footer/Footer';
import Navbar from './components/Shared/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Purchase from './components/Products/Purchase';
import Dashboard from './components/Dashboard/Dashboard';
import MyProfile from './components/Dashboard/MyProfile/MyProfile';
import MyOrders from './components/Dashboard/MyOrders/MyOrders';
import AddReview from './components/Dashboard/AddReview/AddReview';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        }></Route>

        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }>

          <Route index element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }></Route>
          <Route path='my-orders' element={
            <RequireAuth>
              <MyOrders />
            </RequireAuth>
          }></Route>
          <Route path='add-review' element={
            <RequireAuth>
              <AddReview />
            </RequireAuth>
          }></Route>

        </Route>


        <Route path='*' element></Route>
      </Routes>

      <Footer />

      <ToastContainer />
    </div>
  );
}

export default App;
