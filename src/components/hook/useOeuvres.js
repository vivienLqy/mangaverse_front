import axios from "axios";
import { useEffect, useState } from "react";

export default function useOeuvres() {
    const [oeuvres, setOeuvres] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/oeuvres", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setOeuvres(response.data);
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des oeuvres : ", error);
            }
        };
        fetchData();
    }, []);

    return oeuvres;
}
