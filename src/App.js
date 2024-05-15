import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "./components/Auth";
import Accueil from "./pages/Accueil";
import Wrapper from "./components/wrapper";
import Contact from "./pages/Contact";
import MonProduit from "./pages/MonProduit";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Catalogue from "./pages/Catalogue";
import CreateAdmin from "./pages/Dashboard/CreateAdmin";
import UpdateOeuvre from "./pages/Dashboard/UpdateOeuvre";
import UpdateProduct from "./pages/Dashboard/UpdateProduct";
import Monprofil from "./pages/Monprofil";



function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/monproduit/:id" element={<MonProduit />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route
            path="/dashboard"
            element={isAdmin() ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path="/dashboard/update/product/:id"
            element={isAdmin() ? <UpdateProduct /> : <Navigate to="/" />} />
          <Route path="/dashboard/update/oeuvre/:id"
            element={isAdmin() ? <UpdateOeuvre /> : <Navigate to="/" />} />
          <Route path="/dashboard/create/"
            element={isAdmin() ? <CreateAdmin /> : <Navigate to="/" />} />
          <Route path="/monprofil" element={<Monprofil />} />
          <Route path="*" element={<Accueil />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
