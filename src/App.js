import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import MyNavbar from './components/navbar';
import ListingPage from './pages/list';
import HomePage from './pages/home';
import BookDetailPage from './pages/detail';
import OrdersPage from './pages/viewOrder';
import ViewOrderDetails from './pages/viewOrderDetail';

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/book/List' element={<ListingPage />}></Route>
        <Route path='/book/view/:bookId' element={<BookDetailPage />}></Route>
        <Route path='/book/orders' element={<OrdersPage />}></Route>
        <Route path='/books/orders/:bookId' element={<ViewOrderDetails />}></Route>

      </Routes>
    </div>
  );
}

export default App;
