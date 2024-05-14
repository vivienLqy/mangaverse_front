import axios from "axios";
import React, { useEffect, useState } from "react";
import PanelAdmin from "../../components/admin/PanelAdmin";
import NavAdmin from "../../components/wrapper/NavAdmin";
import OeuvresAdmin from "../../components/admin/OeuvresAdmin";
import createV from "../../assets/createGreen.svg";
import { NavLink } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom"; // Import de useLocation pour récupérer les données de l'état
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [oeuvres, setOeuvres] = useState([]);
  const [selectedOeuvre, setSelectedOeuvre] = useState(null);
  const [flashMessage, setFlashMessage] = useState(""); // Nouvelle propriété d'état pour le message flash
  const location = useLocation();
  const { id } = useParams(); // Utilisation de useLocation pour récupérer les données de l'état

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const roles = decodedToken.roles; // Utilisez decodedToken au lieu de token pour accéder aux rôles


  useEffect(() => {
    // Récupérer les produits
    axios
      .get(`http://localhost:8000/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits : ",
          error
        );
      });

    // Récupérer les oeuvres
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

    // Vérifier si un message flash est passé en tant que state depuis UpdateAdmin
    if (location.state && location.state.flashMessage) {
      setFlashMessage(location.state.flashMessage);
      const timeout = setTimeout(() => {
        setFlashMessage("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:8000/api/products/${productId}`)
      .then((response) => {
        setProducts(products.filter((product) => product.id !== productId));
        setFlashMessage("Le produit a été supprimé avec succès !");
        const timeout = setTimeout(() => {
          setFlashMessage("");
        }, 5000);
        return () => clearTimeout(timeout);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la suppression du produit : ",
          error
        );
        // Afficher un message d'erreur si la suppression échoue
        setFlashMessage(
          "Une erreur s'est produite lors de la suppression du produit."
        );
      });
  };

  const handleSelectOeuvre = (oeuvre) => {
    setSelectedOeuvre(oeuvre);
  };

  const filteredProducts = (() => {
    if (selectedOeuvre) {
      return products.filter(
        (product) => product.oeuvres?.id === selectedOeuvre.id
      );
    }
  })();

  return (
    roles.includes("ROLE_ADMIN") && (

      <div className="w-full flex flex-row bg-bleuDark">
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
                Nouvelle oeuvres <img className="py-2" src={createV} alt="" />
              </div>
              <div className="w-full flex flex-col items-center mb-10">
                {oeuvres ? (
                  oeuvres.map((oeuvre, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectOeuvre(oeuvre)}
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
              {flashMessage && (
                <div className="bg-green-500 text-white px-4 py-2 mt-4">
                  {flashMessage}
                </div>
              )}
              <div className="opacity-100 w-10/12 mt-10 mb-1 py-1">
                <div className="flex justify-between items-center w-full mb-2 px-3 bg-nav">
                  <h3>Liste de produits</h3>
                  <NavLink to="/dashboard/create">
                    <div className="flex flex-row-reverse pr-7 gap-1 items-center rounded-md">
                      <img src={createV} className="py-2" alt="logo_create" />
                    </div>
                  </NavLink>
                </div>
                <ul className="bg-nav grid grid-cols-8 text-center p-2">
                  <li>Categorie</li>
                  <li>Oeuvre</li>
                  <li>Nom</li>
                  <li>Type</li>
                  <li>Note</li>
                  <li>Prix</li>
                  <li>Update</li>
                  <li>Delete</li>
                </ul>
              </div>
              {selectedOeuvre ? (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <PanelAdmin
                      product={product}
                      key={index}
                      onDelete={() => handleDelete(product.id)}
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


export default Dashboard;
