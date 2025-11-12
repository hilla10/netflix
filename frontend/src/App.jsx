import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/home/Home';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import Watch from './pages/Watch';
import Search from './pages/Search';
import SearchHistory from './pages/SearchHistory';
import NotFoundPage from './pages/404';

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!user ? <Signup /> : <Navigate to='/' />}
        />
        <Route
          path='/watch/:id'
          element={user ? <Watch /> : <Navigate to='/' />}
        />
        <Route
          path='/search'
          element={user ? <Search /> : <Navigate to='/' />}
        />
        <Route
          path='/history'
          element={user ? <SearchHistory /> : <Navigate to='/' />}
        />
          <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
