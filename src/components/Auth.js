import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
    // Mettez votre logique d'authentification ici
    const token = localStorage.getItem('token');
    return !!token; // Par exemple, vérifiez si un token existe dans le localStorage
};

export const isAdmin = () => {
    // Mettez votre logique de vérification du rôle d'administrateur ici
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.roles;
        return roles.includes('ROLE_ADMIN');
    }
    return false; // Si aucun token n'est présent, l'utilisateur n'est pas administrateur
};
