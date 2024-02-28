import { defineStore } from "pinia";
import { useQuasar } from "quasar";

export const addtocart = defineStore("addtocart", {
  state: () => ({
    $q: useQuasar(),
  }),

  actions: {
    addtocart() {
      const token = localStorage.getItem("x-access-token");
      if (token == null) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "error",
          message: "Faça login para adicionar ao carrinho!",
        });
      } else {
        console.log("ok");
      }
    },
  },
});
