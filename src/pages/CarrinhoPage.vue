<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-markup-table dark class="bg-indigo-8">
        <thead>
          <tr>
            <th class="text-left">Produto</th>
            <th class="text-center">Quantidade</th>
            <th class="text-center">Valor unitário</th>
            <th class="text-center">Valor total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in exibircarrinho" :key="p.id">
            <td class="text-left">{{ p[0].nomeproduto }}</td>
            <td class="text-center">159</td>
            <td class="text-center">{{ "R$ " + p[0].valorproduto }}</td>
            <td class="text-center">24</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { auth } from 'app/auth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'
export default {
  name: 'CarrinhoPage',
  setup() {
    const $router = useRouter()
    const exibircarrinho = ref()

    async function cart() {
      const token = localStorage.getItem('x-access-token')
      const carrinho = await axios.post('http://localhost:3000/cartverify', null, {
        headers: {
          'x-access-token': token,
        }
      })
      const response = await axios.post('http://localhost:3000/cartshow', carrinho.data, {
        headers: {
          'x-access-token': token
        }
      })
      exibircarrinho.value = response.data
    }

    onMounted(async (res) => {
      res = await auth()
      if (!res) {
        $router.push('/index')
      }
      else {
        cart()
      }
    })
    return {
      exibircarrinho
    }
  }
}
</script>
