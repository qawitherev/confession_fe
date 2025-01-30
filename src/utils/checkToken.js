import { jwtDecode } from 'jwt-decode';

const tokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const currTime = Date.now() / 1000;
        if (decoded.exp < currTime) {
            return false;
        } 
        return true;
    } catch {
        return false;
    }
};

export default tokenValid;