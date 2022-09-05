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
import ManageOrders from './components/Dashboard/ManageOrders/ManageOrders';
import RequireAdmin from './components/RequireAuth/RequireAdmin';
import ManageUsers from './components/Dashboard/ManageUsers/ManageUsers';
import NotFound from './components/Shared/NotFound/NotFound';
import AddProduct from './components/Dashboard/AddProduct/AddProduct';
import ManageProducts from './components/Dashboard/ManageProducts/ManageProducts';
import Reviews from './components/Home/Reviews/Reviews';
import Contact from './components/Contact/Contact';
import Blogs from './components/Blogs/Blogs';
import Payment from './components/Dashboard/MyOrders/Payment';

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

          <Route path='manage-orders' element={
            <RequireAdmin>
              <ManageOrders />
            </RequireAdmin>
          }></Route>

          <Route path='manage-users' element={
            <RequireAdmin>
              <ManageUsers />
            </RequireAdmin>
          }></Route>

          <Route path='manage-products' element={
            <RequireAdmin>
              <ManageProducts />
            </RequireAdmin>
          }></Route>

          <Route path='add-product' element={
            <RequireAdmin>
              <AddProduct />
            </RequireAdmin>
          }></Route>

          <Route path='payment/:id' element={<Payment />}></Route>


        </Route>

        <Route path='/reviews' element={<Reviews />}></Route>
        <Route path='/contact-us' element={<Contact />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>


        <Route path='*' element={<NotFound />}></Route>
      </Routes>

      <Footer />

      <ToastContainer />
    </div>
  );
}

export default App;
