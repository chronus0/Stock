import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Creation from "./creation";
import Details from "./details";
import Liste from "./liste";
import Modification from "./modification";

function App() {
  return (
    <div className="App">
      <h1>Stock</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Liste />} />
          <Route path="/stock/create" element={<Creation />} />
          <Route path="/stock/detail/:prid" element={<Details />} />
          <Route path="/stock/edit/:prid" element={<Modification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
