import React, { useState } from "react";
import Logo from "../../assets/Logo.svg";

const Footer = () => {
  const [date, setDate] = useState(new Date())

  return (
    <footer>
      <nav className="bg-nav h-16 w-full ">
        <div className="flex justify-around h-full items-center text-white">
          <div className="">
            <a href="/">
              <img src={Logo} className="w-16 h-12" alt="logo" />
            </a>
          </div>
          <div className="w-96">
            <ul className="hidden lg:flex w-full justify-between text-xs">
              <a href="/src/index.html">
                <li className="hovertext-lavande">Accueil</li>
              </a>
              <a href="#">
                <li className="hovertext-lavande">Catalogue</li>
              </a>
              <a href="#">
                <li className="hovertext-lavande">Contact</li>
              </a>
            </ul>
          </div>
          <p className="text-gray-500">
            Copyright {date.getFullYear()} All rights reserved |{" "}
            <a href="" className="hovertext-lavande">
              Condition de confidentialité
            </a>
          </p>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
