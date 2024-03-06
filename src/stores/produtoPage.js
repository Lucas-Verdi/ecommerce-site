import { defineStore } from "pinia";
import axios from "axios";

export const produtoPage = defineStore("produtoPage", {
  state: () => ({
  }),

  actions: {
    async toPage() {
      const nomeproduto = localStorage.getItem('nomeproduto')
      const valorproduto = localStorage.getItem('valorproduto')
      const token = localStorage.getItem('x-access-token')
      const id = await axios.post("http://localhost:3000/productverify", null, {
        headers: {
          'x-access-token': token,
          'nomeproduto': nomeproduto,
          'valorproduto': valorproduto,
        },
      })

      const produto = await axios.post('http://localhost:3000/toPage', null, {
        headers: {
          'x-access-token': token,
          'idproduto': id.data
        }
      })
      return produto
    }
  },
});
