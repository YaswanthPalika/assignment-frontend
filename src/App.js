import "./App.css";
import Records from "./components/records";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Multi from "./components/multi";

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Records />} />
            <Route path="/multi" element={<Multi />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
