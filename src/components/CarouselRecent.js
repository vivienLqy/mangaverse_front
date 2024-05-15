import React, { useState, useEffect } from "react";
import axios from "axios";

const CarouselRate = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // State pour vérifier si c'est un appareil mobile
  const [recentWorks, setRecentWorks] = useState([]);

  useEffect(() => {
    // Détection de l'appareil mobile
    const checkIsMobile = () => {
      const isMobileDevice = window.innerWidth <= 768; // Vous pouvez ajuster cette valeur selon vos besoins
      setIsMobile(isMobileDevice);
    };

    // Vérification lors du chargement initial de la page
    checkIsMobile();

    // Vérification lors du redimensionnement de la fenêtre
    window.addEventListener("resize", checkIsMobile);

    return () => {
      // Nettoyage de l'écouteur d'événement lors du démontage du composant
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/oeuvres", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res) => {
        const sortedWorks = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const limitedWorks = sortedWorks.slice(0, 6);
        setRecentWorks(limitedWorks);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des oeuvres : ", error);
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recentWorks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recentWorks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-2/4">
      <div className="flex justify-center">
        <div className="w-full">
          <div className="flex justify-around">
            {recentWorks.length > 0 &&
              recentWorks
                .slice(currentIndex, currentIndex + (isMobile ? 1 : 3))
                .map((work, index) => (
                  <div
                    key={index}
                    className={`w-full h-full flex justify-center items-center transition-opacity duration-500`}
                  >
                    <img
                      src={`http://localhost:8000/api/img/manga/${work.picture}`}
                      alt={work.name}
                      className="object-cover h-52"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>

      {(!isMobile || recentWorks.length > 1) && ( // Afficher les boutons de navigation sauf sur les appareils mobiles s'il n'y a qu'une seule œuvre
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-gray-800/50 text-white rounded-full p-2"
          >
            {"<"}
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-gray-800/50 text-white rounded-full p-2"
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
};

export default CarouselRate;


// const sortedWorks = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
