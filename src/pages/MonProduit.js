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
    if (selectedProduct && selectedProduct.picture) {
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
  }, [selectedProduct?.picture, selectedProduct]);
  console.log(selectedProduct)

  return (
    <section className="bg-bleuDark text-white">
      <div className="flex w-1/2 m-auto mt-10">
        <div className="">
          <img
            src={
              selectedProduct && selectedProduct.picture
                ? `http://localhost:8000/api/img/manga/${selectedProduct.picture}`
                : 'placeholder_image_url_here'
            }
            alt={productImage}
            className=" w-52"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className=" text-4xl">
              {selectedProduct
                ? selectedProduct.oeuvres?.name
                : "Nom du produit non trouvé"}
            </h1>
            <p>
              {selectedProduct
                ? selectedProduct.type?.name
                : "type du produit non trouvé"} /
              {selectedProduct && selectedProduct.oeuvres && selectedProduct.oeuvres.genres
                ? selectedProduct.oeuvres.genres.map((genre, index) => (
                  <span key={index}>
                    {genre.name}
                    {index !== selectedProduct.oeuvres.genres.length - 1 && "/ "}
                  </span>
                ))
                : "genres non trouvés"}
            </p>
          </div>
          <div>
            <p>
              En stock :
              {selectedProduct
                ? selectedProduct.quantiter
                : "quantité du produit non trouvé"}
            </p>
            <p>
              Auteur :{" "}
              {selectedProduct && selectedProduct.oeuvres
                ? selectedProduct.oeuvres.auteur
                  ? selectedProduct.oeuvres.auteur.name
                  : "Auteur non trouvé"
                : "Information sur l'auteur non disponible"}
            </p>

          </div>
        </div>
      </div>
      <div className=" flex items-center m-auto gap-4 w-1/2 py-5">
        <p>
          {selectedProduct
            ? selectedProduct.prix
            : "quantité du produit non trouvé"}€
        </p>
        <button className="py-1 rounded px-3 text-black bg-orange-200">
          Ajouter au panier
        </button>
      </div>

      <div className="sm:w-1/2 m-auto border px-5 py-10">
        <p>
          Introduction de la serie :
        </p>
        <p className="mt-5">
          {selectedProduct
            ? selectedProduct?.oeuvres?.text
            : "description du produit non trouvé"}
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
