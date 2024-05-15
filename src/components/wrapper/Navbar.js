import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu";
import Login from "../../assets/login.svg";
import Dashboard from "../../assets/dashboard.svg";
import Shop from "../../assets/shop.svg";
import Logo from "../../assets/Logo.svg";
import Logout from "../../assets/logout.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  let location = useLocation();
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          const roles = decodedToken.roles;
          setRoles(roles);
          console.log(roles);
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération de l'utilisateur : ",
          error
        );
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/connexion";
  };

  // console.log(roles);
  return (
    <div>
      {!location.pathname.startsWith('/dashboard') && (
        <nav className=" bg-nav w-full " id="ancre-up">
          <div className="flex justify-around h-full items-center text-white">
            <div className="">
              <NavLink to="/" className="flex items-center">
                <img className="w-16 h-16 ml-5 " src={Logo} alt="logo" />
                <p>MangasVerse</p>
              </NavLink>
            </div>
            <div className="w-96">
              <ul className="hidden sm:flex w-full justify-between">
                <NavLink to="/">
                  <li className="bg-lavande p-5">Accueil</li>
                </NavLink>
                <NavLink to="/catalogue">
                  <li className="bg-lavande p-5">Catalogue</li>
                </NavLink>
                <NavLink to="/contact">
                  <li className="bg-lavande p-5">Contact</li>
                </NavLink>
              </ul>
            </div>
            <div className="hidden lg:flex w-28 justify-between size-6">
              {roles !== null && roles.includes("ROLE_ADMIN") && (
                <NavLink to="/dashboard" className="svg-container">
                  <img src={Dashboard} alt="loupe" />
                </NavLink>
              )}
              <NavLink to="" className="svg-container">
                <img src={Shop} alt="boutique" />
              </NavLink>
              {localStorage.getItem("token") ? (
                <div className="flex gap-3">
                  <NavLink to="/monprofil" className="svg-container">
                    <img src={Login} alt="mon profil" />
                  </NavLink>
                  <NavLink
                    onClick={logout}
                    to="/connexion"
                    className="svg-container"
                  >
                    <img src={Logout} alt="deconnexion" />
                  </NavLink>
                </div>
              ) : (
                <NavLink to="/connexion" className="svg-container">
                  <img src={Login} alt="connexion" />
                </NavLink>
              )}
            </div>
            <div className="hamburger">
              <BurgerMenu></BurgerMenu>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
