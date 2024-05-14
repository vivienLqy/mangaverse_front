import axios from "axios";
import React, { useState, useEffect } from "react";
import NavAdmin from "../../components/wrapper/NavAdmin";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [prix, setPrix] = useState("");
  const [quantiter, setQuantiter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection
  const [flashMessage, setFlashMessage] = useState(""); // Nouvelle propriété d'état pour le message flash

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des produits : ", error);
      });

  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => product.id === parseInt(id));
    setFilteredProducts(filtered);
  }, [id, products]);

  const selectedProduct = filteredProducts.find(
    (product) => product.id === parseInt(id)
  );

  const handleValidation = () => {
    axios.patch(`http://localhost:8000/api/products/${id}`, {
      name: name,
      prix: prix,
      quantiter: quantiter
    })
      .then((res) => {
        console.log("Mise à jour réussie !");
        // Définir le message flash
        setFlashMessage("Mise à jour réussie !");
        // Redirection vers la page de tableau de bord après la modification réussie
        navigate("/dashboard", { state: { flashMessage: "Mise à jour réussie !" } });

      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour : ", error);
      });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full flex flex-row bg-bleuDark">
      <NavAdmin />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full h-96 bg-bgAdmin bg-no-repeat bg-cover bg-center">
          <h1 className="flex h-full justify-center items-center text-white">Produits</h1>
        </div>
        <div className="bg-white bg-opacity-10 w-1/3 flex justify-center items-center my-20 text-white">
          <div className="flex flex-col justify-center items-center my-10">
            {selectedProduct && (
              <div className="flex flex-col justify-center items-center">
                <form className="w-52">
                  <div className="text-center mb-5">
                    <h3>{selectedProduct.oeuvres?.name}</h3>
                  </div>
                  <div id="oui" className="flex flex-col justify-between items-center w-full">
                    <img
                      src={`/img/manga/${selectedProduct?.oeuvres?.name.replace(
                        /\s+/g,
                        ""
                      )}/${selectedProduct?.picture}`}
                      alt="One piece"
                      className="mt-1"
                    />
                    <div className="w-full ms-1 flex flex-col justify-between text-center">
                      <div className="bg-blackOP30 my-1 text-center">
                        <input type="text" onChange={(e) => setName(e.target.value)} name="name" defaultValue={selectedProduct.name} className="bg-transparent w-full " />
                      </div>
                      <div className="bg-blackOP30 my-1 text-center">
                        <input type="number" onChange={(e) => setPrix(parseFloat(e.target.value))} name="prix" defaultValue={selectedProduct.prix} className="bg-transparent w-full" />
                      </div>
                      <div className="bg-blackOP30 my-1">
                        <input type="number" onChange={(e) => setQuantiter(parseInt(e.target.value))} name="quantiter" defaultValue={selectedProduct.quantiter} className="bg-transparent w-full" />
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex justify-center gap-4 mt-5">
                    <button type="button" className=" bg-red-700 rounded-md px-10 py-2 " onClick={handleCancel}>Annuler</button>
                    <button type="button" className=" bg-green-700 rounded-md px-10 py-2" onClick={handleValidation}>Valider</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
