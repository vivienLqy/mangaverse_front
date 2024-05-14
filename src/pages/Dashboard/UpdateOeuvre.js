// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import NavAdmin from "../../components/wrapper/NavAdmin";
// import { useParams, useNavigate } from "react-router-dom";


// const UpdateOeuvre = () => {
//     const [oeuvres, setOeuvres] = useState([]);
//     const [name, setName] = useState("");
//     const [text, setText] = useState("");
//     const [rating, setRating] = useState("");
//     const [pegi, setPegi] = useState("");

//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(""); // Ajout de l'état pour la catégorie sélectionnée
//     const [type, setType] = useState([]);
//     const [selectedType, setSelectedType] = useState("")
//     const [filteredOeuvres, setFilteredOeuvres] = useState([]);
//     const navigate = useNavigate();
//     const { id } = useParams();

//     useEffect(() => {
//         axios
//             .get(`http://localhost:8000/api/oeuvres`)
//             .then((res) => {
//                 setOeuvres(res.data);
//             })
//             .catch((error) => {
//                 console.error("Une erreur s'est produite lors de la récupération des produits : ", error);
//             });
//         axios
//             .get(`http://localhost:8000/api/categorie`)
//             .then((res) => {
//                 setCategories(res.data);
//             })
//             .catch((error) => {
//                 console.error(
//                     "Une erreur s'est produite lors de la récupération des catégories : ",
//                     error
//                 );
//             });
//         axios
//             .get(`http://localhost:8000/api/type`)
//             .then((res) => {
//                 setType(res.data);
//             })
//             .catch((error) => {
//                 console.error(
//                     "Une erreur s'est produite lors de la récupération des catégories : ",
//                     error
//                 );
//             });
//     }, []);
//     useEffect(() => {
//         const filtered = oeuvres.filter((oeuvre) => oeuvre.id === parseInt(id));
//         setFilteredOeuvres(filtered);
//     }, [id, oeuvres]);

//     const selectedOeuvre = filteredOeuvres.find(
//         (oeuvre) => oeuvre.id === parseInt(id)
//     );

//     const handleValidation = () => {
//         axios.patch(`http://localhost:8000/api/oeuvres/${id}`, {
//             name: name,
//             text: text,
//             rating: rating,
//             pegi: pegi
//         })
//             .then((res) => {
//                 console.log("Mise à jour réussie !");
//                 // Définir le message flash
//                 // setFlashMessage("Mise à jour réussie !");
//                 // Redirection vers la page de tableau de bord après la modification réussie
//                 navigate("/dashboard", { state: { flashMessage: "Mise à jour réussie !" } });

//             })
//             .catch((error) => {
//                 console.error("Erreur lors de la mise à jour : ", error);
//             });
//     };
//     const handleCancel = () => {
//         navigate("/dashboard");
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };
//     const handleTypeChange = (event) => {
//         setSelectedType(event.target.value);
//     };


//     return (
//         <div>
//             <div className="w-full flex flex-row bg-bleuDark">
//                 <NavAdmin />
//                 <div className="w-full flex flex-col justify-center items-center">
//                     <div className="w-full h-96 bg-bgAdmin bg-no-repeat bg-cover bg-center">
//                         <h1 className="flex h-full justify-center items-center text-white">Produits</h1>
//                     </div>
//                     <div className="bg-white bg-opacity-10 w-1/3 flex justify-center items-center my-20 text-white">
//                         <div className="w-full flex flex-col justify-center items-center my-10">
//                             {selectedOeuvre && (
//                                 <div className="w-10/12 flex flex-col justify-center items-center">
//                                     <form className="w-52">
//                                         <div className="text-center mb-5">
//                                             <h3>{selectedOeuvre.name}</h3>
//                                         </div>
//                                         <div id="oui" className="flex flex-col justify-between items-center w-full">
//                                             <img
//                                                 src={`/img/manga/${selectedOeuvre.name.replace(
//                                                     /\s+/g,
//                                                     ""
//                                                 )}/${selectedOeuvre.picture}`}
//                                                 alt="One piece"
//                                                 className="mt-1"
//                                             />
//                                             <div className="w-full ms-1 flex flex-col justify-between text-center">
//                                                 <div className="bg-blackOP30 my-1 text-center">
//                                                     <input type="text" onChange={(e) => setName(e.target.value)} name="name" defaultValue={selectedOeuvre.name} className="bg-transparent w-full " />
//                                                 </div>
//                                                 <div className="bg-blackOP30 my-1 text-center">
//                                                     <textarea onChange={(e) => setText(parseFloat(e.target.value))} name="text" defaultValue={selectedOeuvre.text} className="bg-transparent w-full" />
//                                                 </div>
//                                                 <div className="bg-blackOP30 my-1">
//                                                     <input type="number" onChange={(e) => setRating(parseInt(e.target.value))} name="rating" defaultValue={selectedOeuvre.rating} className="bg-transparent w-full" />
//                                                 </div>
//                                                 {/* <div className="bg-blackOP30 flex flex-row">
//                                                     <select value={selectedCategory} onChange={handleCategoryChange} className=" bg-transparent ">
//                                                         <option value="" className="bg-transparent">{selectedOeuvre.categories?.name}</option>
//                                                         {categories.map((category) => (
//                                                             <option key={category.id} value={category.name}>
//                                                                 {category.name}
//                                                             </option>
//                                                         ))}
//                                                     </select>
//                                                     <select value={selectedType} onChange={handleTypeChange} className=" bg-transparent ">
//                                                         <option value="" className="bg-transparent">{selectedOeuvre.type?.name}</option>
//                                                         {type.map((type) => (
//                                                             <option key={type.id} value={type.name}>
//                                                                 {type.name}
//                                                             </option>
//                                                         ))}
//                                                     </select>
//                                                 </div> */}

//                                             </div>
//                                             <div className="w-full flex justify-center gap-4 mt-5">
//                                                 <button type="button" className=" bg-red-700 rounded-md px-10 py-2 " onClick={handleCancel}>Annuler</button>
//                                                 <button type="button" className=" bg-green-700 rounded-md px-10 py-2" onClick={handleValidation}>Valider</button>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UpdateOeuvre;

// {/* <div className="bg-blackOP30 flex flex-row">
//     <select value={selectedCategory} onChange={handleCategoryChange} className=" bg-transparent ">
//         <option value="" className="bg-transparent">Sélectionnez une catégorie</option>
//         {categories.map((category) => (
//             <option key={category.id} value={category.name}>
//                 {category.name}
//             </option>
//         ))}
//     </select>
//     <select value={selectedType} onChange={handleTypeChange} className=" bg-transparent ">
//         <option value="" className="bg-transparent">Sélectionnez un type</option>
//         {type.map((type) => (
//             <option key={type.id} value={type.name}>
//                 {type.name}
//             </option>
//         ))}
//     </select>
//         </div> */}
