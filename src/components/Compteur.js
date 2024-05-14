import React, { useState } from "react";

const Compteur = () => {
  const [count, setCount] = useState(0);

  const incrementer = () => {
    setCount(count + 1);
  };
  const decrementer = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <p>Mon compteur est a {count}</p>
      <button className=" bg-red-500 rounded mr-8 px-4" onClick={incrementer}>
        Incrementer
      </button>
      <button className=" bg-green-500 rounded px-4" onClick={decrementer}>
        Decrementer
      </button>
    </div>
  );
};

export default Compteur;
