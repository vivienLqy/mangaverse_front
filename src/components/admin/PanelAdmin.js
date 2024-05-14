import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Update from "../../assets/update.svg";
import Delete from "../../assets/delete.svg";
import Check from "../../assets/check.svg";
import Cancel from "../../assets/cancel.svg";

const PanelAdmin = ({ product, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteClick = () => {
        setConfirmDelete(true);
    };

    const handleConfirmDelete = () => {
        onDelete(product.id);
        setConfirmDelete(false);
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
    };

    return (
        <div className='w-10/12 mb-1 py-1 bg-blackOP30'>
            <ul className='grid grid-cols-8 text-white'>
                <li className="text-center">{product.categorie?.name || '-'}</li>
                <li className="text-center">{product.oeuvres?.name || '-'}</li>
                <li className="text-center">{product.name}</li>
                <li className="text-center">{product.type?.name || '-'}</li>
                <li className="text-center">{product.oeuvres?.rating || '-'}/10</li>
                <li className="text-center">{product.prix}€</li>
                <li className="text-center flex justify-center">
                    <NavLink to={`/dashboard/update/product/${product.id}`} className="svg-container">
                        <img src={Update} alt="boutique" className='w-8' />
                    </NavLink>
                </li>
                <li className="text-center flex justify-center">
                    {confirmDelete ? (
                        <div className='w-full'>
                            <p>Confirmer</p>
                            <div className=' m-auto w-1/2 flex justify-around'>
                                <button className="text-green-800" onClick={handleConfirmDelete}>
                                    <img src={Check} alt="" />
                                </button>
                                <button className=' text-red-800' onClick={handleCancelDelete}>
                                    <img src={Cancel} alt="" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleDeleteClick} className="svg-container">
                            <img src={Delete} alt="boutique" className='w-6' />
                        </button>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default PanelAdmin;
