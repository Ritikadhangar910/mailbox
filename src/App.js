import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Mynavbar from "./components/Mynavbar/Mynavbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Allmails from "./components/Allmails/Allmails";
function App() {
  const isloggedIn = useSelector((state) => state.credential.token);
  return (
    <>
      <BrowserRouter>
        <Mynavbar />
        <Routes>
          {isloggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/allmails" element={<Allmails />} />
            </>
          ) : (
            <Route path="/auth" element={<Auth />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
