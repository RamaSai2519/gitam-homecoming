import CryptoJS from 'crypto-js';

const SECRET_KEY = 'sukoon';

export const useAdmin = () => {
    const getAdmin = () => {
        const encryptedAdmin = localStorage.getItem('admin');
        if (!encryptedAdmin) return {};
        const bytes = CryptoJS.AES.decrypt(encryptedAdmin, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    const setAdmin = (admin: any) => {
        const encryptedAdmin = CryptoJS.AES.encrypt(JSON.stringify(admin), SECRET_KEY).toString();
        localStorage.setItem('admin', encryptedAdmin);
    };

    return { admin: getAdmin(), setAdmin };
};