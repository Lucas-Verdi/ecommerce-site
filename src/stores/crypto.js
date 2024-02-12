import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js';

const VUE_APP_SECRET_KEY = 'fJ7#yM1(xY6#jR6:'

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
      const encryptedData = CryptoJS.AES.encrypt(jsonData, VUE_APP_SECRET_KEY).toString();
      return encryptedData;
    }
  }
})


export const cryptoLogin = defineStore('cryptologin', {
  state: () => ({
    email: null,
    password: null
  }),

  actions: {
    encryptData(data) {
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), VUE_APP_SECRET_KEY).toString();
      return ciphertext;
    }
  }
})
