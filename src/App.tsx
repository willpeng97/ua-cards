import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { CartProvider } from './context/CartContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  background-color: #F1F1F1;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <CartProvider>
        <AppContainer>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </AppContainer>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
