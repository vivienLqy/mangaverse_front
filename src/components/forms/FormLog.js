import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import eye from "../../assets/eye.svg";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const FormLog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [capVal, setCapVal] = useState(null);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registrationConfirmPassword, setRegistrationConfirmPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [eyes, setEyes] = useState(false);
  const [error, setError] = useState("");
  const currentUrl = window.location.pathname;

  useEffect(() => {
    const regexEmail = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
    if (registrationEmail === "") {
      setValidEmail(null);
    } else {
      setValidEmail(regexEmail.test(registrationEmail));
    }
  }, [registrationEmail]);

  useEffect(() => {
    const regexPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
    if (registrationPassword === "") {
      setValidPwd(null);
    } else {
      setValidPwd(regexPwd.test(registrationPassword));
    }
  }, [registrationPassword]);

  useEffect(() => {
    if (registrationConfirmPassword === "") {
      setValidConfirmPwd(null);
    } else {
      setValidConfirmPwd(registrationPassword === registrationConfirmPassword);
    }
  }, [registrationPassword, registrationConfirmPassword]);

  const storeToken = (token) => {
    localStorage.setItem("token", token);
  };

  const login = async (email, password) => {
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
      setError("Échec de l'authentification. Veuillez vérifier vos identifiants.");
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

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    if (validEmail && validPwd && validConfirmPwd && capVal) {
      try {
        const response = await axios.post("http://localhost:8000/api/users/", {
          email: registrationEmail,
          password: registrationPassword,
        });
        if (response.status === 200) {
          console.log("User registered successfully!");
          window.location.href = "/connexion";
        }
      } catch (error) {
        setError("L'inscription a échoué. Veuillez réessayer.");
      }
    } else {
      setError("Veuillez remplir correctement tous les champs.");
    }
  };

  const showPwd = () => {
    setEyes(!eyes);
  };

  if (currentUrl === "/connexion") {
    return (
      <section>
        <div className="flex flex-col items-center bg-blue-900 bg-opacity-80 p-28">
          <div className="">
            <img src={Logo} alt="logo" />
          </div>
          <h1 className="text-red-600 font-bold text-xl p-4">Connexion</h1>
          {error && <p className="text-red-600">{error}</p>}
          <form onSubmit={handleLoginSubmit} method="POST" className="">
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="email"
                className="p-2 rounded-lg w-full text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center relative">
              <div className="flex items-center w-full relative">
                <input
                  type={eyes ? "text" : "password"}
                  placeholder="password"
                  className="p-2 my-4 rounded-lg w-full text-center pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src={eye}
                  alt="show password"
                  className="w-5 absolute right-3 cursor-pointer"
                  onClick={showPwd}
                />
              </div>
            </div>
            <ReCAPTCHA
              className="flex justify-center"
              sitekey="6LeX5-spAAAAAKKZB2p-K6OsoXKa0L-UlAyN_cPT"
              onChange={val => setCapVal(val)}
            />
            <div className="flex justify-center my-5">
              <button disabled={!capVal} type="submit" className="p-2 bg-blue-400 rounded-xl">
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
          <h1 className="text-red-600 font-bold text-xl p-4">Incription</h1>
          {error && <p className="text-red-600">{error}</p>}
          <form autoComplete="off" onSubmit={handleRegistrationSubmit} className="my-4">
            <div className="flex flex-col ">
              <label htmlFor="registrationEmail">Adresse mail</label>
              <input
                type="email"
                id="registrationEmail"
                onChange={(e) => setRegistrationEmail(e.target.value)}
                className={`border-2 m-auto ${validEmail !== null ? (validEmail ? "border-green-500" : "border-red-500") : ""}`}
              />
              <span className={`text-sm mb-2 ${validEmail ? "text-green-600" : "text-red-500"}`}>
                {validEmail !== null ? (validEmail ? "Email valide" : "Email non valide") : ""}
              </span>

              <label htmlFor="registrationPassword">Mot de passe</label>
              <div className="relative m-auto">
                <input
                  type={eyes ? "text" : "password"}
                  id="registrationPassword"
                  onChange={(e) => setRegistrationPassword(e.target.value)}
                  className={`border-2 m-auto ${validPwd !== null ? (validPwd ? "border-green-500" : "border-red-500") : ""}`}
                />
                <img
                  src={eye}
                  alt="show password"
                  className="w-5 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={showPwd}
                />
              </div>
              <span className={`text-sm mb-2 w-1/2 m-auto ${validPwd !== null ? (validPwd ? "text-green-600" : "text-red-500") : ""}`}>
                {validPwd !== null ? (validPwd ? "Mot de passe valide" : "Mot de passe non valide, minimum 6 caractère, 1 majuscule, 1 minuscule, 1 chiffre, un caractère special : #?!@$ %^&*-") : ""}
              </span>

              <label htmlFor="registrationConfirmPassword">Confirmez le mot de passe</label>
              <input
                type="password"
                id="registrationConfirmPassword"
                onChange={(e) => setRegistrationConfirmPassword(e.target.value)}
                className={`border-2 m-auto ${validConfirmPwd !== null ? (validConfirmPwd ? "border-green-500" : "border-red-500") : ""}`}
              />
              <span className={`text-sm mb-2 ${validConfirmPwd !== null ? (validConfirmPwd ? "text-green-600" : "text-red-500") : ""}`}>
                {validConfirmPwd !== null ? (validConfirmPwd ? "Les mots de passe correspondent" : "Les mots de passe ne correspondent pas") : ""}
              </span>
            </div>
            <ReCAPTCHA
              className="flex justify-center"
              sitekey="6LeX5-spAAAAAKKZB2p-K6OsoXKa0L-UlAyN_cPT"
              onChange={val => setCapVal(val)}
            />
            <button disabled={!capVal} type="submit" className="bg-orange-500 rounded-xl p-2 mt-2">
              Je m'inscrit
            </button>
          </form>
          <p className="text-blue-400 font-bold">
            Déja un compte ?
            <NavLink to="/">
              <strong className="text-red-700">Connectez-vous</strong>
            </NavLink>
          </p>
        </div>
      </section>
    );
  }
};

export default FormLog;
