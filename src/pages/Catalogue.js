import React, { useState, useEffect } from "react";
import axios from "axios";
import CardProduit from "../components/CardProduit";

const Catalogue = () => {
  const [oeuvres, setOeuvres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // Utiliser un seul état pour gérer l'affichage des dropdowns
  const [dropdownType, setDropdownType] = useState(""); // Ajouter un état pour suivre le type de dropdown ouvert
  const [searchText, setSearchText] = useState(""); // Ajout de l'état pour le texte de recherche

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/oeuvres", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setOeuvres(res.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des oeuvres : ", error);
      });

    axios
      .get("http://localhost:8000/api/genres", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGenres(res.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des genres : ", error);
      });

    axios
      .get("http://localhost:8000/api/types", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTypes(res.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des types : ", error);
      });
    axios
      .get("http://localhost:8000/api/img/manga", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res) => {
        // Stocker les données d'images récentes dans l'état local
        setOeuvres(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des images : ",
          error
        );
      });
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setShowDropdown(!showDropdown);
    setDropdownType(dropdown); // Mettre à jour le type de dropdown ouvert
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setShowDropdown(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowDropdown(false);
  };

  const handleShowAll = () => {
    setSelectedGenre(null);
    setSelectedType(null);
    setShowDropdown(false);
  };

  // Fonction de recherche pour filtrer les oeuvres en fonction du texte saisi
  const searchOeuvre = (value) => {
    setSearchText(value);
    // Réinitialiser le genre sélectionné à null lorsque le texte de recherche est vide
    if (value === "") {
      setSelectedGenre(null);
      setSelectedType(null);
    }
  };

  const filteredOeuvres = oeuvres.filter((oeuvre) => {
    const matchesGenre = selectedGenre ? oeuvre.genres.some((genre) => genre.name === selectedGenre.name) : true;
    const matchesType = selectedType ? oeuvre.type.name === selectedType.name : true;
    const matchesSearch = oeuvre.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesGenre && matchesType && matchesSearch;
  });

  return (
    <div className="h-full bg-bleuDark">
      <div className="w-full bg-white flex justify-center">
        <div className="py-2 relative flex items-center">
          <form onSubmit={(e) => e.preventDefault()} className="d-flex" role="search">
            <input
              className="borderLavande rounded-md text-center flex-grow"
              type="search"
              placeholder="Titre"
              onChange={(e) => {
                searchOeuvre(e.target.value);
              }}
              aria-label="Search oeuvre"
            />
          </form>
          <div className="relative mx-2">
            <button
              type="button"
              onClick={() => handleDropdownToggle("genre")}
              className="inline-flex justify-center px-2 mx-2 rounded-md borderLavande focus:outline-none bg-lavande"
              id="genreDropdownButton"
            >
              Genres
            </button>
            {showDropdown && dropdownType === "genre" && (
              <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-48 overflow-y-auto">
                <div className="py-1">
                  <div
                    onClick={handleShowAll}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Tous
                  </div>
                  {genres ? (
                    genres.map((genre, index) => (
                      <div
                        key={index}
                        onClick={() => handleGenreSelect(genre)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {genre.name}
                      </div>
                    ))
                  ) : (
                    <p className="block px-4 py-2 text-sm text-gray-700">Chargement en cours...</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => handleDropdownToggle("type")}
              className="inline-flex justify-center px-2 rounded-md borderLavande focus:outline-none bg-lavande"
              id="typeDropdownButton"
            >
              Types
            </button>
            {showDropdown && dropdownType === "type" && (
              <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-48 overflow-y-auto">
                <div className="py-1">
                  <div
                    onClick={handleShowAll}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Tous
                  </div>
                  {types ? (
                    types.map((type, index) => (
                      <div
                        key={index}
                        onClick={() => handleTypeSelect(type)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {type.name}
                      </div>
                    ))
                  ) : (
                    <p className="block px-4 py-2 text-sm text-gray-700">Chargement en cours...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center flex-row text-center text-white pt-10">
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredOeuvres.length > 0 ? (
            filteredOeuvres.map((oeuvre, index) => (
              <CardProduit oeuvre={oeuvre} key={index} />
            ))
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
