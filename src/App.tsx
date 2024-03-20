import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoutes from './components/PrivateRoutes';

const App = () => {

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />}/>
      </Route>
      
      <Route path="/login" element={<Login />} />
    </Routes>
  )
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper
