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
          <tr v-for="(p, index) in exibircarrinho" :key="p.id">
            <td class="text-left">{{ p[0].nomeproduto }}
              <q-btn @click="removerItem(p[0].nomeproduto, p[0].valorproduto)" class="q-ml-md" label="Remover" dense
                color="red" />
            </td>
            <td class="text-center">
              <q-input color="white" filled dense v-model.number="qtd[index]" type="number"
                style="width: 80px; margin-left: 183px;" />
            </td>
            <td class="text-center">{{ "R$ " + p[0].valorproduto }}</td>
            <td class="text-center">{{ "R$ " + p[0].valorproduto * qtd[index] }}</td>
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
import { useQuasar } from 'quasar'

export default {
  name: 'CarrinhoPage',
  setup() {
    const $q = useQuasar()
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

    async function removerItem(nomeproduto, valorproduto) {
      const token = localStorage.getItem('x-access-token')
      await axios.post('http://localhost:3000/removeritemcarrinho', null, {
        headers: {
          'x-access-token': token,
          'nomeproduto': nomeproduto,
          'valorproduto': valorproduto
        }
      })
      $q.notify({
        color: "red",
        textColor: "white",
        icon: "ion-cart",
        message: "Item removido",
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
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
      removerItem,
      qtd: ref([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      exibircarrinho
    }
  }
}
</script>
