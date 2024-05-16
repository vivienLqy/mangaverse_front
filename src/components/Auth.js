import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {

    const token = localStorage.getItem('token');
    return !!token;
};

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.roles;
        return roles.includes('ROLE_ADMIN');
    }
    return false;
};
