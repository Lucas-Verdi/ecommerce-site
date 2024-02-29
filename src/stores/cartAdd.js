import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import axios from "axios";

export const addtocart = defineStore("addtocart", {
  state: () => ({
    $q: useQuasar(),
  }),

  actions: {
    async addtocart(nomeproduto, valorproduto) {
      const token = localStorage.getItem('x-access-token')
      if (!token) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "error",
          message: "Faça login para adicionar ao carrinho!",
        });
      } else if (token) {
        const id = await axios.post("http://localhost:3000/productverify", null, {
          headers: {
            'x-access-token': token,
            'nomeproduto': nomeproduto,
            'valorproduto': valorproduto,
          },
        })
        await axios.post("http://localhost:3000/cartadd", null, {
          headers: {
            'x-access-token': token,
            'idproduto': id.data,
          },
        })
          .then(() => {
            this.$q.notify({
              color: "green",
              textColor: "white",
              icon: "ion-cart",
              message: "Adicionado ao carrinho",
            });
          })
      }
    },
  },
});
