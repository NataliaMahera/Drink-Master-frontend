import { Navigate, Route, Routes } from 'react-router-dom';
import { AppWrapper } from './App.styled';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { Suspense, lazy } from 'react';

const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));

function App() {
  return (
    <AppWrapper>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Navigate to="/welcome" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/drinks" element={<DrinksPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AppWrapper>
  );
}
export default App;
