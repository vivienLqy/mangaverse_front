import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/update/product/:id" element={<UpdateProduct />} />
          <Route path="/dashboard/update/oeuvre/:id" element={<UpdateOeuvre />} />
          <Route path="/dashboard/create/" element={<CreateAdmin />} />
          <Route path="/monprofil" element={<Monprofil />} />

          <Route path="*" element={<Accueil />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
