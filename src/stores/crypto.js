import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js';

export const cryptoLogin = defineStore('cryptologin', {
  actions: {
    encryptData(data) {
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'fJ7#yM1(xY6#jR6:').toString();
      return ciphertext;
    }
  }
})

export const cryptoCadastro = defineStore('cryptocadastro', {
  actions: {
    encryptData(data) {
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'fJ7#yM1(xY6#jR6:').toString();
      return ciphertext;
    }
  }
})
