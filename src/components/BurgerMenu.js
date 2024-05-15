import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "../assets/search.svg";
import Shop from "../assets/shop.svg";
import Login from "../assets/login.svg";


const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden md:flex burger-menu  mr-5">
      <button
        className={`burger-icon ${isOpen ? "open" : ""
          } flex flex-col justify-between h-6 w-8`}
        onClick={toggleMenu}
      >
        <span
          className={`bg-white h-1 w-full transition-all duration-300 transform ${isOpen ? "rotate-45 translate-y-2" : ""
            }`}
        ></span>
        <span
          className={`bg-white h-1 w-full transition-all duration-300 transform ${isOpen ? "opacity-0" : ""
            }`}
        ></span>
        <span
          className={`bg-white h-1 w-full transition-all duration-300 transform ${isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
        ></span>
      </button>
      {isOpen && (
        <div className=" text-white text-center absolute top-16 right-0 w-full  p-3 gap-2 bg-nav">
          <ul>
            <NavLink to="/" exact activeClassName="active" onClick={toggleMenu}>
              <li className="bg-lavande">Accueil</li>
            </NavLink>
            <NavLink to="/catalogue" activeClassName="active" onClick={toggleMenu}>
              <li className="bg-lavande">Produits</li>
            </NavLink>
            <NavLink to="/contact" activeClassName="active" onClick={toggleMenu}>
              <li className="bg-lavande">Contact</li>
            </NavLink>
            <div className="flex justify-center gap-4 py-1">
              <NavLink to="/" className="svg-container">
                <li> <img src={Search} alt="loupe" /></li>
              </NavLink>
              <NavLink to="/dashboard" className="svg-container">
                <li><img src={Shop} alt="boutique" /></li>
              </NavLink>
              <NavLink to="/connexion" className="svg-container">
                <li> <img src={Login} alt="connexion" /></li>
              </NavLink>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
