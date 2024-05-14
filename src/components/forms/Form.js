import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Form = () => {
  const nameRegex = useMemo(() => /^[a-zA-Z\- ]{2,}$/, []);
  const emailRegex = useMemo(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, []);
  const phoneRegex = useMemo(() => /^\+(?:\d{1,3})?\d{10,14}$/, []);
  const sujetRegex = useMemo(() => /^[a-zA-Z0-9\s\-,.!?:;'"()]+$/, []);
  const messageRegex = useMemo(() => /^[a-zA-Z0-9\s\n\-,.!?:;'"()]+$/, []);

  const [firstname, setFirstname] = useState('');
  const [validFirstname, setValidFirstname] = useState(false);
  const [lastname, setLastname] = useState('');
  const [validLastname, setValidLastname] = useState(false);
  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [sujet, setSujet] = useState('');
  const [validSujet, setValidSujet] = useState(false);
  const [msg, setMsg] = useState('');
  const [validMsg, setValidMsg] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setValidFirstname(nameRegex.test(firstname));
  }, [firstname, nameRegex]);

  useEffect(() => {
    setValidLastname(nameRegex.test(lastname));
  }, [lastname, nameRegex]);

  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email, emailRegex]);

  useEffect(() => {
    setValidPhone(phoneRegex.test(phone));
  }, [phone, phoneRegex]);

  useEffect(() => {
    setValidSujet(sujetRegex.test(sujet));
  }, [sujet, sujetRegex]);

  useEffect(() => {
    setValidMsg(messageRegex.test(msg));
  }, [msg, messageRegex]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8000/contact`, {})
      .then((res) => {
        setData(res.data)
        console.log(data);
        console.log("data", res.data);
        console.log("Mise à jour réussie !");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour : ", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="md:w-2/3 lg:w-1/3 mx-auto bg-gray-700 rounded-lg p-6 flex flex-col">
        <h2 className="text-2xl text-white mb-5 text-center">Contactez-nous</h2>
        <div className="flex flex-wrap mb-4">
          <div className="w-full lg:w-1/2 lg:pr-2 mb-4 lg:mb-0">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nom"
              className={`py-3 px-4 w-full bg-gray-800 rounded text-gray-100 border ${!validLastname && lastname ? 'border-red-500' : validLastname ? 'border-green-500' : ''}`}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {!validLastname && lastname && (
              <div className="text-red-500 text-sm mt-1">
                Veuillez entrer un nom valide (au moins 2 caractères).
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/2 lg:pl-2">
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prénom"
              className={`py-3 px-4 w-full bg-gray-800 rounded text-gray-100 border ${!validFirstname && firstname ? 'border-red-500' : validFirstname ? 'border-green-500' : ''}`}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            {!validFirstname && firstname && (
              <div className="text-red-500 text-sm mt-1">
                Veuillez entrer un prénom valide (au moins 2 caractères).
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={`py-3 px-4 w-full bg-gray-800 rounded text-gray-100 border ${!validEmail && email ? 'border-red-500' : validEmail ? 'border-green-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!validEmail && email && (
            <div className="text-red-500 text-sm mt-1">
              Veuillez entrer une adresse email valide.
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="tel"
            id="telephone"
            name="telephone"
            placeholder="Téléphone"
            className={`py-3 px-4 w-full bg-gray-800 rounded text-gray-100 border ${!validPhone && phone ? 'border-red-500' : validPhone ? 'border-green-500' : ''}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {!validPhone && phone && (
            <div className="text-red-500 text-sm mt-1">
              Veuillez entrer un numéro de téléphone valide.
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="sujet"
            name="sujet"
            placeholder="Sujet"
            className={`py-3 px-4 w-full bg-gray-800 rounded text-gray-100 border ${!validSujet && sujet ? 'border-red-500' : validSujet ? 'border-green-500' : ''}`}
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
          />
          {!validSujet && sujet && (
            <div className="text-red-500 text-sm mt-1">
              Le sujet doit contenir uniquement des lettres, des chiffres, des espaces et les caractères spéciaux suivants : -,.!?:;'"()
            </div>
          )}
        </div>
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className={`py-3 px-4 w-full bg-gray-800 rounded text-gray-100 border ${!validMsg && msg ? 'border-red-500' : validMsg ? 'border-green-500' : ''}`}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
          {!validMsg && msg && (
            <div className="text-red-500 text-sm mt-1">
              Le message doit contenir uniquement des lettres, des chiffres, des espaces et les caractères spéciaux suivants : -,.!?:;'"()
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center w-full align-middle items-center">
          <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Envoyer
          </button>
          <button className="text-blue-300 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg">
            Retour
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
