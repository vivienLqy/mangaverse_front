import React from "react";

const monprofil = () => {
  return (
    <section className="bg-bleuDark">
      <div className="w-1/2 m-auto py-8 bg-white">
        <ul className="flex justify-around w-1/2 m-auto">
          <li className="bg-lavande p-3">Mon profil</li>
          <li className="bg-lavande p-3">Mes adresses</li>
          <li className="bg-lavande p-3">Mes commandes</li>
          <li className="bg-lavande p-3">Mes ventes</li>
        </ul>
        <div className="border">
          <h1>Mes coordonnées</h1>
          <div className="flex gap-3">
            <input type="checkbox" /> M
            <input type="checkbox" /> Mme
          </div>
          <div className=" grid grid-cols-2">
            <input
              type="text"
              placeholder="Utilisateur"
              className=" w-11/12 m-auto border p-3"
            />
            <input
              type="text"
              placeholder="Email"
              className=" w-11/12 m-auto border p-3"
            />
            <input
              type="text"
              placeholder="Prenom"
              className=" w-11/12 m-auto my-5 border p-3"
            />
            <input
              type="text"
              placeholder="Nom"
              className=" w-11/12 m-auto border p-3"
            />
            <input
              type="text"
              placeholder="Date de naissance"
              className=" w-11/12 m-auto border p-3"
            />
            <input
              type="text"
              placeholder="Telephone"
              className=" w-11/12 m-auto border p-3"
            />
          </div>
          <h2>Modifier mon mot de passe</h2>
          <form className="grid grid-cols-3">
            <input type="password" placeholder="Ancien mot de passe" className="w-11/12 m-auto p-3 border" />
            <input type="password" placeholder="Nouveau mot de passe" className="w-11/12 m-auto p-3 border" />
            <input type="password" placeholder="Confirmez le nouveau mot de passe" className="w-11/12 m-auto p-3 border" />
          </form>
            <button type="submit" className=" bg-gray-500 ">VALIDER</button>
        </div>
      </div>
    </section>
  );
};

export default monprofil;
