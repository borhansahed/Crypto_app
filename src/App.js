import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoinDetails from "./components/CoinDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Coins from "./components/pages/Coins";
import Exchanges from "./components/pages/Exchanges";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/coins"} element={<Coins />} />
        <Route path={"/coins/:id"} element={<CoinDetails />} />
        <Route path={"/exchanges"} element={<Exchanges />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
