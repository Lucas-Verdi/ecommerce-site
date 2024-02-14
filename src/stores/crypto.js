import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js';

export const cryptoCadastro = defineStore('cryptocadastro', {
  state: () => ({
    nome: null,
    sobrenome: null,
    dtNascimento: null,
    cpf: null,
    email: null,
    password: null,
    confirmPassword: null,
  }),

  actions: {
    encryptData() {
      const jsonData = JSON.stringify(data);
      const encryptedData = CryptoJS.AES.encrypt(jsonData, key).toString();
      return encryptedData;
    }
  }
})


export const cryptoLogin = defineStore('cryptologin', {
  actions: {
    encryptData(data) {
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'fJ7#yM1(xY6#jR6:').toString();
      return ciphertext;
    }
  }
})
