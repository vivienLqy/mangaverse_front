import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useParams } from "react-router-dom";

const MonProduit = () => {
  const [products, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productImage, setProductImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits : ",
          error
        );
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.oeuvres?.id === parseInt(id)
    );
    setFilteredProducts(filtered);
  }, [id, products]);

  const selectedProduct = filteredProducts.find(
    (product) => product.oeuvres?.id === parseInt(id)
  );

  useEffect(() => {
    if (selectedProduct?.picture) {
      axios
        .get(`http://localhost:8000/api/img/manga/${selectedProduct.picture}`)
        .then((res) => {
          setProductImage(res.data);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération de l'image : ",
            error
          );
        });
    }
  }, [selectedProduct?.picture]);

  return (
    <section className="bg-bleuDark text-white">
      <div className="flex w-1/2 m-auto ">
        <div className="">
          <img
            src={`http://localhost:8000/api/img/manga/${selectedProduct.picture}`} // Utilisation de productImage pour afficher l'image
            alt={productImage}
            className="w-44"
          />
        </div>
        <div className="">
          <p>
            {selectedProduct
              ? selectedProduct.oeuvres?.name
              : "Nom du produit non trouvé"}
          </p>
          <p>
            {selectedProduct
              ? selectedProduct.type?.name
              : "type du produit non trouvé"}
          </p>
          <p>
            En stock :
            {selectedProduct
              ? selectedProduct.quantiter
              : "quantité du produit non trouvé"}
          </p>
        </div>
      </div>
      <div className=" flex items-center m-auto gap-4 w-1/2 py-5">
        <p>
          Prix :
          {selectedProduct
            ? selectedProduct.prix
            : "quantité du produit non trouvé"}
        </p>
        <button className="py-1 rounded px-3 text-black bg-orange-200">
          Ajouter au panier
        </button>
      </div>

      <div className="sm:w-1/2 m-auto border">
        <p>
          Introduction de la serie :
          <p>
            {selectedProduct
              ? selectedProduct?.oeuvres?.text
              : "description du produit non trouvé"}
          </p>
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-7">
          {filteredProducts.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MonProduit;
