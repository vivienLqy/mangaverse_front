import React from "react";

const Product = ({ product }) => {
  return (
    <section className="flex flex-col items-center justify-around my-4  text-center">
      <div>
        <img
          src={`http://localhost:8000/api/img/manga/${product?.picture}`}
          alt={product?.name}
          className="w-44"
        />
        <div className="flex gap-1">
          <p>{product.oeuvres?.name}</p>
          <p>{product.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <p> prix : {product.prix}</p>
          <button className=" rounded p-2 bg-blue-500">
            Ajouter au panier
          </button>
        </div>
      </div>
      {/* <p> Crée le : {product.created_at}</p> */}
    </section>
  );
};
export default Product;

