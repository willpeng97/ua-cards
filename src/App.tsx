import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import NoticePage from './pages/NoticePage';
import CheckoutPage from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  background-color: #F1F1F1;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 2rem;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <CartProvider>
        <AppContainer>
          <Navbar />
          <MainContent>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/report' element={<ReportPage />} />
              <Route path='/notice' element={<NoticePage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
