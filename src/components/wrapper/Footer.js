import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import Logo from "../../assets/Logo.svg";

const Footer = () => {
  const [date] = useState(new Date());

  return (
    <footer>
      <nav className="bg-nav h-16 w-full ">
        <div className="flex justify-around h-full items-center text-white">
          <div className="">
            <NavLink to="/"> {/* Change here */}
              <img src={Logo} className="w-16 h-12" alt="logo" />
            </NavLink>
          </div>
          <div className="w-96">
            <ul className="hidden lg:flex w-full justify-between text-xs">
              <NavLink to="/accueil"> {/* Change here */}
                <li className="hovertext-lavande">Accueil</li>
              </NavLink>
              <NavLink to="/catalogue"> {/* Change here */}
                <li className="hovertext-lavande">Catalogue</li>
              </NavLink>
              <NavLink to="/contact"> {/* Change here */}
                <li className="hovertext-lavande">Contact</li>
              </NavLink>
            </ul>
          </div>
          <p className="text-gray-500">
            Copyright {date.getFullYear()} All rights reserved |{" "}
            <NavLink to="/confidentialite" className="hovertext-lavande"> {/* Change here */}
              Condition de confidentialité
            </NavLink>
          </p>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
