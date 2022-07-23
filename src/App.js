import { BrowserRouter, Route, Routes ,Navigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginScreen from "./components/LoginScreen";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "./components/styles/app.css";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route  element={<LoginScreen />}>
              <Route path="signup" element={<Signup />} />
              <Route index path="login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
