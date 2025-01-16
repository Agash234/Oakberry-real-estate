const CryptoJS = require('crypto-js');
const {secretkey}=require('../config/config')


const encryptData = (data) => {
   
    return CryptoJS.AES.encrypt(data, secretkey).toString();
};

const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretkey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptData, decryptData };