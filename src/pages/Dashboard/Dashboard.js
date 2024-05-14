import axios from "axios";
import React, { useEffect, useState } from "react";
import PanelAdmin from "../../components/admin/PanelAdmin";
import NavAdmin from "../../components/wrapper/NavAdmin";
import OeuvresAdmin from "../../components/admin/OeuvresAdmin";
import createV from "../../assets/createGreen.svg";
import { NavLink, useLocation } from "react-router-dom"; // Importation de NavLink et useLocation
import { jwtDecode } from "jwt-decode"; // Importation de jwtDecode

const TableauDeBord = () => {
  const [produits, setProduits] = useState([]);
  const [oeuvres, setOeuvres] = useState([]);
  const [oeuvreSelectionnee, setOeuvreSelectionnee] = useState(null);
  const [messageFlash, setMessageFlash] = useState("");
  const location = useLocation();
  const token = localStorage.getItem('token');
  const tokenDecode = jwtDecode(token);
  const roles = tokenDecode.roles;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/produits`)
      .then((res) => {
        setProduits(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits : ",
          error
        );
      });

    axios
      .get(`http://localhost:8000/api/oeuvres`)
      .then((res) => {
        setOeuvres(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des oeuvres : ",
          error
        );
      });

    if (location.state && location.state.messageFlash) {
      setMessageFlash(location.state.messageFlash);
      const timeout = setTimeout(() => {
        setMessageFlash("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [location.state]);

  const supprimerProduit = (idProduit) => {
    axios
      .delete(`http://localhost:8000/api/produits/${idProduit}`)
      .then((response) => {
        setProduits(produits.filter((produit) => produit.id !== idProduit));
        setMessageFlash("Le produit a été supprimé avec succès !");
        const timeout = setTimeout(() => {
          setMessageFlash("");
        }, 5000);
        return () => clearTimeout(timeout);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la suppression du produit : ",
          error
        );
        setMessageFlash(
          "Une erreur s'est produite lors de la suppression du produit."
        );
      });
  };

  const selectionnerOeuvre = (oeuvre) => {
    setOeuvreSelectionnee(oeuvre);
  };

  const produitsFiltres = (() => {
    if (oeuvreSelectionnee) {
      return produits.filter(
        (produit) => produit.oeuvres?.id === oeuvreSelectionnee.id
      );
    }
  })();

  return (
    roles.includes("ROLE_ADMIN") && (
      <div className="w-full flex flex-row bg-bleuFonce">
        <NavAdmin />
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full h-96 bg-bgAdmin bg-no-repeat bg-cover bg-center">
            <h1 className="flex h-full justify-center items-center text-white">
              Produits
            </h1>
          </div>
          <div className="flex justify-between w-10/12">
            <div className="bg-white h-fit bg-opacity-10 w-1/4 flex flex-col my-20  items-center">
              <div className="bg-nav opacity-100 w-10/12 mt-10 mb-1 py-1 text-white flex items-center justify-around text-center">
                Nouvelles oeuvres <img className="py-2" src={createV} alt="" />
              </div>
              <div className="w-full flex flex-col items-center mb-10">
                {oeuvres ? (
                  oeuvres.map((oeuvre, index) => (
                    <div
                      key={index}
                      onClick={() => selectionnerOeuvre(oeuvre)}
                      className="cursor-pointer w-10/12 text-center"
                    >
                      <OeuvresAdmin oeuvre={oeuvre} />
                    </div>
                  ))
                ) : (
                  <p>Chargement en cours...</p>
                )}
              </div>
            </div>

            <div className="bg-white bg-opacity-10 w-2/3 flex flex-col justify-start items-center my-20 text-white">
              {messageFlash && (
                <div className="bg-green-500 text-white px-4 py-2 mt-4">
                  {messageFlash}
                </div>
              )}
              <div className="opacity-100 w-10/12 mt-10 mb-1 py-1">
                <div className="flex justify-between items-center w-full mb-2 px-3 bg-nav">
                  <h3>Liste de produits</h3>
                  <NavLink to="/dashboard/creer">
                    <div className="flex flex-row-reverse pr-7 gap-1 items-center rounded-md">
                      <img src={createV} className="py-2" alt="logo_create" />
                    </div>
                  </NavLink>
                </div>
                <ul className="bg-nav grid grid-cols-8 text-center p-2">
                  <li>Catégorie</li>
                  <li>Oeuvre</li>
                  <li>Nom</li>
                  <li>Type</li>
                  <li>Note</li>
                  <li>Prix</li>
                  <li>Mise à jour</li>
                  <li>Supprimer</li>
                </ul>
              </div>
              {oeuvreSelectionnee ? (
                produitsFiltres.length > 0 ? (
                  produitsFiltres.map((produit, index) => (
                    <PanelAdmin
                      produit={produit}
                      key={index}
                      onDelete={() => supprimerProduit(produit.id)}
                    />
                  ))
                ) : (
                  <p>Aucun produit trouvé pour cette oeuvre.</p>
                )
              ) : (
                <p>Sélectionnez une oeuvre pour filtrer les produits.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TableauDeBord;
