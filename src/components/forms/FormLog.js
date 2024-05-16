import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"
//6Lfi0d4pAAAAAJ5J7KO-bl0I1g8TTLZ3tCX2xuOc
const FormLog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [capVal, setCapVal] = useState(null);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registrationConfirmPassword, setRegistrationConfirmPassword] =
    useState("");
  const [error, setError] = useState("");
  const currentUrl = window.location.pathname;

  const storeToken = (token) => {
    localStorage.setItem("token", token);
  };
  // const decodeToken = (token) => {
  //   try {
  //     const decodedToken = jwt_decode(token);
  //     return decodedToken;
  //   }catch (error) {
  //     setError( "Erreur de decodage du token:", error);
  //     return null;
  //   }
  // }
  const login = async (email, password) => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login_check",
        {
          username: email,
          password: password,
        }
      );
      if (response.data && response.data.token) {
        storeToken(response.data.token);

        window.location.href = "/";
      } else {
        setError("Identifiants de connexion invalides.");
      }
    } catch (error) {
      setError(
        "Échec de l'authentification. Veuillez vérifier vos identifiants."
      );
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  //   const handleRegistrationSubmit = async (e) => {
  //     e.preventDefault();
  //    try {
  //     const response = await axios.post("http://localhost:8000/api/register", { email: registrationEmail, password: registrationPassword });
  //     // Traitez la réponse ou redirigez l'utilisateur vers la page de connexion, par exemple
  //   } catch (error) {
  //     setError("L'inscription a échoué. Veuillez réessayer.");
  //   };
  // }

  if (currentUrl === "/connexion") {
    return (
      <section>
        <div className="flex flex-col items-center bg-blue-900 bg-opacity-80 p-28 ">
          <div className="">
            <img src={Logo} alt="logo" />
          </div>
          <h1 className=" text-red-600 font-bold text-xl p-4">Connexion</h1>
          {error && <p className="text-red-600">{error}</p>}
          <form onSubmit={handleLoginSubmit} method="POST" className="">
            <div className="flex justify-center">
              <input
                type="email"
                name=""
                id=""
                placeholder="email"
                className="p-2 rounded-lg w-full text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="password"
                name=""
                id=""
                placeholder="password"
                className="p-2 my-4 rounded-lg w-full  text-center"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <ReCAPTCHA
              className="flex justify-center"
              sitekey="6Lfi0d4pAAAAAJ5J7KO-bl0I1g8TTLZ3tCX2xuOc"
              onChange={val => setCapVal(val)}

            />
            <div className="flex justify-center my-5">
              <button disabled={!capVal} type="submit" className=" p-2 bg-blue-400 rounded-xl">
                Se connecter
              </button>
            </div>
          </form>
          <p className="text-blue-400 font-bold">
            Vous n'avez pas encore de compte ?
            <NavLink to="/register">
              <strong className="text-red-600">Inscrivez-vous</strong>
            </NavLink>
          </p>
        </div>
      </section>
    );
  }

  if (currentUrl === "/register") {
    return (
      <section>
        <div className="flex flex-col items-center bg-blue-900 bg-opacity-80 p-28 text-center">
          <div className="">
            <img src={Logo} alt="logo" />
          </div>
          <h1 className=" text-red-600 font-bold text-xl p-4">Incription</h1>
          <form method="POST">
            <div>
              <input
                type="email"
                name=""
                id=""
                placeholder="email"
                value={registrationEmail}
                onChange={(e) => setRegistrationEmail(e.target.value)}
                className="p-2 rounded-lg text-center w-full"
              />
            </div>
            <div className="flex gap-2 my-4">
              <div className="">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Nom"
                  className="p-2 rounded-lg text-center"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Prenom"
                  className="p-2 rounded-lg text-center"
                />
              </div>
            </div>
            <div className="">
              <input
                type="password"
                name=""
                id=""
                placeholder="Mot de passe"
                value={registrationPassword}
                onChange={(e) => setRegistrationPassword(e.target.value)}
                className="p-2  rounded-lg  text-center w-full"
              />
            </div>
            <div className="">
              <input
                type="password"
                name=""
                id=""
                placeholder="Confirmation du mot de passe"
                value={registrationConfirmPassword}
                onChange={(e) => setRegistrationConfirmPassword(e.target.value)}
                className="p-2 my-3  rounded-lg  text-center w-full"
              />
            </div>
            <ReCAPTCHA
              className="flex justify-center"
              sitekey="6Lfi0d4pAAAAAJ5J7KO-bl0I1g8TTLZ3tCX2xuOc"
              onChange={val => setCapVal(val)}

            />
            <button disabled={!capVal} type="submit" className=" p-2 bg-blue-400 rounded-xl">
              S'inscrire
            </button>
          </form>
          <p className=" text-blue-400 font-bold">
            Déja un compte ?
            <NavLink to="/connexion">
              <strong className="text-red-700">Connectez-vous</strong>
            </NavLink>
          </p>
        </div>
      </section>
    );
  }
};

export default FormLog;
