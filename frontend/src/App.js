import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
