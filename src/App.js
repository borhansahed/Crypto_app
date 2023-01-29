import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Route path={"/exchanges"} element={<Exchanges />} />
      </Routes>
    </Router>
  );
}

export default App;
