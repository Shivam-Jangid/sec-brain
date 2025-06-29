import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import Signin from "./components/pages/Signin";
import SignUp from "./components/pages/SignUp";


function App() {
  return <BrowserRouter>
  <Routes >
    <Route path="/" element = {<Dashboard />} />
    <Route path="/signin" element = {<Signin />} />
    <Route path="signup" element = {<SignUp />}/>
    <Route path="/dashboard" element = {<Dashboard />}/>
  </Routes>
  </BrowserRouter>
}

export default App;

// startIcon={<ShareIcon size = "sm"/>}
