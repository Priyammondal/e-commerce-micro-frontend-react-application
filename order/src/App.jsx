import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
const App = () => {
  return (
    <div className="myorders">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
