import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import NoticePage from "./pages/NoticePage";
import CheckoutPage from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route, HashRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

const AppContainer = styled.div`
	background-color: #f1f1f1;
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
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
`;

function App() {
	return (
		<CartProvider>
			{/* <BrowserRouter basename="/shop"> */}
			<HashRouter>
				<GlobalStyles />
				<AppContainer>
					<Navbar />
					<MainContent>
						<Routes>
							{/* 自動導向到首頁 */}
							<Route path="/" element={<HomePage />} />
							<Route path="/report" element={<ReportPage />} />
							<Route path="/notice" element={<NoticePage />} />
							<Route path="/checkout" element={<CheckoutPage />} />
						</Routes>
					</MainContent>
					<Footer />
					<ScrollToTop />
				</AppContainer>
			</HashRouter>
		</CartProvider>
	);
}

export default App;
