<template>
  <q-page padding>
    <div v-if="$q.screen.gt.sm" class="row text-center q-pt-md q-mb-xl">
      <div v-for="(p, index) in produtos" :key="p.nome" class="col-3 q-pl-xl">
        <q-card filled bordered class="my-card">
          <img :src="p.img" />
          <q-btn flat dense @click="toPage(index)"><q-card-section>{{ p.nome }}</q-card-section></q-btn>
          <q-card-section>{{ p.valor }}
            <div class="absolute-top-right q-ma-xs q-pr-sm">
              <q-tooltip>Adicionar ao carrinho</q-tooltip>
              <q-btn @click="Adicionar(index)" round color="green" icon="ion-cart" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { auth } from 'app/auth'
import axios from 'axios'
import { addtocart } from "src/stores/cartAdd";

export default {
  name: 'produtoCategoria',
  setup() {
    const $router = useRouter()
    const produtos = ref([])
    const promocoes = ref([]);
    const logado = ref(true)



    async function buscaProdutos() {
      const token = localStorage.getItem("x-access-token");
      const idcategoria = localStorage.getItem('idcategoria')
      const res = await axios.post(
        "http://localhost:3000/produtopcategoria",
        null,
        {
          headers: {
            "idcategoria": idcategoria,
          },
        }
      );
      return res
    }

    async function Adicionar(p) {
      const res = await buscaProdutos()
      const nomeproduto = res.data[p].nomeproduto
      const valorproduto = res.data[p].valorproduto
      const resposta = addtocart().addtocart(nomeproduto, valorproduto)
      return resposta;
    }

    async function setValores(p) {
      const res = await buscaProdutos()
      const nomeproduto = res.data[p].nomeproduto
      const valorproduto = res.data[p].valorproduto
      localStorage.setItem('nomeproduto', nomeproduto)
      localStorage.setItem('valorproduto', valorproduto)
    }

    async function toPage(p) {
      await setValores(p)
      if (logado.value) {
        $router.push('/produto')
      }
      else {
        $router.push('/produtopmn')
      }
    }



    onMounted(async () => {
      const token = localStorage.getItem('x-access-token')
      if (!token) {
        logado.value = false
      }
      const idcategoria = localStorage.getItem('idcategoria')
      const res = await axios.post(
        "http://localhost:3000/produtopcategoria",
        null,
        {
          headers: {
            "idcategoria": idcategoria,
          },
        }
      );

      produtos.value = [
        { nome: res.data[0].nomeproduto, valor: res.data[0].valorproduto, img: res.data[0].imgproduto },
      ]
    })
    return {
      setValores,
      promocoes,
      logado,
      produtos,
      Adicionar,
      toPage,
    }
  }
}
</script>
