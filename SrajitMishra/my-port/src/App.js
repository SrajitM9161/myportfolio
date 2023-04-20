import "./index.css"
import { Route,Routes } from "react-router-dom";
import Contact from "./Routes/Contact";
import Project from "./Routes/Project";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Expericence from "./Routes/Expericence";
function App() {
  return (
    <div >
   <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/experience" element={<Expericence/>}/>
      <Route path="/project" element={<Project/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </div>
  );
}

export default App;
